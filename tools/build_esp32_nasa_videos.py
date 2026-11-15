# -*- coding: utf-8 -*-
import os
import wave
import math
import subprocess
import asyncio
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import edge_tts

ROOT = r"d:\01 antigraviti varios\nasa"
VIDEO_DIR = os.path.join(ROOT, "assets", "video")
ASSETS_DIR = os.path.join(ROOT, "assets")
SCRATCH = os.path.join(ROOT, "tools", "_tmp_audio"); os.makedirs(SCRATCH, exist_ok=True)
FFMPEG = r"C:\Users\maxi\AppData\Local\CapCut\Apps\1.1.0.95\ffmpeg.exe"
os.makedirs(VIDEO_DIR, exist_ok=True)

W, H = 1920, 1080
FPS = 30
DURATION = 29.0
TOTAL_FRAMES = int(DURATION * FPS)  # 870 frames -> 29.00s (< 30.0s strict NASA rule)
SR = 44100

VOICES = {
    "en": "en-US-JennyNeural",
    "es": "es-AR-ElenaNeural",
    "pt": "pt-BR-FranciscaNeural",
}

# Concise, dramatic, crystal-clear narration synced to the 5 visual acts:
# Act 1: 0.00 - 5.40s  (VO starts 0.18s, max 4.95s)
# Act 2: 5.40 - 12.00s (VO starts 5.55s, max 6.20s)
# Act 3: 12.00 - 20.60s (VO starts 12.15s, max 8.15s)
# Act 4: 20.60 - 24.80s (VO starts 20.75s, max 3.85s)
# Act 5: 24.80 - 29.00s (VO starts 24.95s, max 3.65s)
V_TEXT = {
    "en": {
        "vo": [
            (0.18, 4.95, "From Río Cuarto and Calamuchita, Team INANNA presents TERRA-SHIFT SCADA."),
            (5.55, 6.20, "Live NASA satellites guide resilient crops while our offline ESP32 reads four-to-twenty milliamp root probes."),
            (12.15, 8.15, "Watch our ESP32 code on a cut wire: current hits zero, NAMUR safety locks the pump, and NASA moisture takes over!"),
            (20.75, 3.85, "Repaired to twelve milliamps—saving thirty-eight percent of water."),
            (24.95, 3.65, "NASA science in orbit, precision at the root!")
        ],
        "top_kicker": "2026 NASA SPACE APPS • FIELD SHIFT CHALLENGE • RÍO CUARTO → SANTA ROSA DE CALAMUCHITA",
        "s1_title": "ORBITAL NASA TELEMETRY → OFFLINE ESP32 MECHATRONICS",
        "s1_sub": "20-Year NASA POWER + MODIS + SMAP Root-Zone Data Guiding 2050 Crop Adaptation",
        "s1_chart": "NASA POWER + SMAP RECORD (2004–2024): +1.8 °C WARMING • -31% RAIN",
        "s1_crops": "2050 CMIP6 CROP TRANSITION MATRIX (CÓRDOBA)",
        "crops": [("Sorghum", 94, (16,185,129)), ("Chickpea", 96, (16,185,129)), ("Super-Olive", 95, (0,184,230)), ("Serrana Vine", 92, (56,189,248)), ("Rainfed Maize", 52, (239,68,68))],
        "s1_t2m_lbl": "T2M_MAX Canopy Peak (>41.3 °C)",
        "s1_gwet_lbl": "SMAP GWETROOT Moisture (46.2%)",
        "s1_impact": "CLOSED-LOOP DRIP + VFD IMPACT:  -38% WATER  |  -34% ENERGY",
        "ap_bar": "http://192.168.4.1 • SSID: INANNA-TERRASHIFT-AP • OFFLINE FIELD MODE",
        "esp_title": "ESP32 Field Concentrator",
        "esp_sub": "24V 4–20 mA Kirchhoff Loop (165 Ω) + NASA SMAP Fusion",
        "banner_nom": "STATUS: NORMAL OPERATION — OPTIMAL MOISTURE",
        "banner_dry": "STATUS: DRY ROOT (17.5%) — VFD DRIP IRRIGATION ON",
        "banner_cut": "CRITICAL: WIRE CUT (0.00 mA) — PUMP LOCKED + NASA BACKUP!",
        "banner_ack": "STATUS: LOOP REPAIRED (50.0%) — SCADA ACK & ARMED",
        "m_labels": ["SOIL LOOP (4–20mA)", "NASA GWETROOT", "DRIP PRESSURE", "VFD PUMP FLOW"],
        "sub_open": "OPEN LOOP <3.6mA!", "sub_root": "Root", "sub_bkp": "ACTIVE BACKUP!", "sub_sync": "SMAP Sync OK",
        "sub_lock": "GPIO27 LOCKED!", "sub_on": "GPIO26: ON", "sub_off": "GPIO26: OFF",
        "osc_hdr": "4–20 mA ADS1115 OSCILLOSCOPE  |  --- 3.60 mA NAMUR FLOOR",
        "node_list": ["Node #01 Vine (A4:CF:01)", "Node #02 Olive (A4:CF:02)", "Node #03 Chickpea (A4:CF:03)"],
        "gw_box": ("ESP32 GATEWAY", "MAC 24:6F:28:01", "PLC + NASA SYNC"),
        "sim_btns": ["Nominal (11.68mA)", "Dry Root (6.80mA)", "Cut Wire (0.00mA)", "Repair + ACK (12mA)"],
        "ide_title": "LIVE ESP32 C++ FIRMWARE EXECUTION (esp32_gateway_scada_modbus.ino)",
        "mesh_title": "AES-128 ESP-NOW MESH (2.4 ms • ZERO INTERNET) → MODBUS TCP:502",
        "serial_title": "USB SERIAL MONITOR (115200 BAUD) & MODBUS REGISTERS",
        "serial_nom": "[ESP-NOW] Node#01 (<2.4ms) | I=11.68mA (48.0%) | NASA=46.2% | VFD=OFF",
        "serial_dry": "[IRRIGATION] Dry Root 6.80mA (17.5% < 36%) + NASA OK -> VFD PUMP ON (22.4 m3/h)",
        "serial_cut": "[NAMUR NE43] WIRE CUT 0.00mA (<3.6mA)! GPIO27 LOCKS PUMP -> NASA BACKUP!",
        "serial_ack": "[SCADA ACK] Loop restored 12.00mA (50.0%) -> Interlock cleared, PLC Ready.",
        "end_kicker": "OPEN-SOURCE AGRICULTURAL CLIMATE ADAPTATION & RURAL IIoT",
        "end_sub": "NASA Science in Orbit. Mechatronic Precision at the Root.",
        "end_team": "TEAM INANNA: Fabio M. Medina Rojas • Agustín A. Debia • Iván D. Coria",
        "end_loc": "Origin: Río Cuarto, Córdoba  |  Local Event: Santa Rosa de Calamuchita, AR",
        "end_stats": [("-38%", "Freshwater Saved"), ("-34%", "VFD Pump Energy"), ("< 4 ms", "Offline ESP-NOW"), ("0 Floods", "NAMUR NE43 Safety")]
    },
    "es": {
        "vo": [
            (0.18, 4.95, "Desde Río Cuarto y Calamuchita, el Equipo INANNA presenta TERRA-SHIFT SCADA."),
            (5.55, 6.20, "Satélites NASA en vivo guían cultivos resilientes y nuestro ESP32 sin internet lee sondas de cuatro a veinte miliamperios."),
            (12.15, 8.15, "Mirá nuestro código ESP32 ante un cable cortado: cae a cero miliamperios, enclava la bomba y activa el respaldo NASA."),
            (20.75, 3.85, "Reparado a doce miliamperios, ahorrando treinta y ocho por ciento de agua."),
            (24.95, 3.65, "¡Ciencia NASA en órbita, precisión en la raíz!")
        ],
        "top_kicker": "NASA SPACE APPS 2026 • DESAFÍO FIELD SHIFT • RÍO CUARTO → SEDE SANTA ROSA DE CALAMUCHITA",
        "s1_title": "TELEMETRÍA ORBITAL NASA → MECATRÓNICA ESP32 SIN INTERNET",
        "s1_sub": "20 Años de NASA POWER + MODIS + SMAP Guiando la Transición Agrícola 2050",
        "s1_chart": "SERIE NASA POWER + SMAP (2004–2024): +1.8 °C CALOR • -31% LLUVIA",
        "s1_crops": "MATRIZ DE TRANSICIÓN DE CULTIVOS 2050 (CÓRDOBA)",
        "crops": [("Sorgo Granífero", 94, (16,185,129)), ("Garbanzo Kabuli", 96, (16,185,129)), ("Olivo Intensivo", 95, (0,184,230)), ("Vid Serrana", 92, (56,189,248)), ("Maíz Secano", 52, (239,68,68))],
        "s1_t2m_lbl": "Pico Térmico T2M_MAX (>41.3 °C)",
        "s1_gwet_lbl": "Humedad SMAP GWETROOT (46.2%)",
        "s1_impact": "IMPACTO GOTEO + VARIADOR VFD:  -38% AGUA  |  -34% ENERGÍA",
        "ap_bar": "http://192.168.4.1 • RED: INANNA-TERRASHIFT-AP • MODO CAMPO SIN SEÑAL",
        "esp_title": "Concentrador Rural ESP32",
        "esp_sub": "Lazo 24V 4–20 mA Kirchhoff (165 Ω) + Fusión NASA SMAP",
        "banner_nom": "ESTADO: OPERACIÓN NORMAL — HUMEDAD ÓPTIMA",
        "banner_dry": "ESTADO: RAÍZ SECA (17.5%) — RIEGO VFD ENCENDIDO",
        "banner_cut": "CRÍTICO: CABLE CORTADO (0.00 mA) — ¡BOMBA BLOQUEADA + NASA!",
        "banner_ack": "ESTADO: LAZO REPARADO (50.0%) — ALARMA CONFIRMADA",
        "m_labels": ["LAZO SUELO (4–20mA)", "NASA GWETROOT", "PRESIÓN GOTEO", "CAUDAL BOMBA VFD"],
        "sub_open": "¡LAZO ABIERTO <3.6mA!", "sub_root": "Raíz", "sub_bkp": "¡RESPALDO ACTIVO!", "sub_sync": "Sincronía SMAP OK",
        "sub_lock": "¡GPIO27 BLOQUEADO!", "sub_on": "GPIO26: ENCENDIDO", "sub_off": "GPIO26: APAGADO",
        "osc_hdr": "OSCILOSCOPIO 4–20 mA ADS1115  |  --- PISO NAMUR 3.60 mA",
        "node_list": ["Nodo #01 Vid (A4:CF:01)", "Nodo #02 Olivo (A4:CF:02)", "Nodo #03 Garbanzo (A4:CF:03)"],
        "gw_box": ("ESP32 CENTRAL", "MAC 24:6F:28:01", "PLC + SINC NASA"),
        "sim_btns": ["Nominal (11.68mA)", "Raíz Seca (6.80mA)", "Cortar Cable (0mA)", "Reparar + ACK (12mA)"],
        "ide_title": "EJECUCIÓN EN VIVO DEL CÓDIGO C++ ESP32 (esp32_gateway_scada_modbus.ino)",
        "mesh_title": "MALLA RURAL ESP-NOW AES-128 (2.4 ms • CERO INTERNET) → MODBUS :502",
        "serial_title": "MONITOR SERIE USB (115200 BAUDIOS) Y REGISTROS MODBUS",
        "serial_nom": "[ESP-NOW] Nodo#01 (<2.4ms) | I=11.68mA (48.0%) | NASA=46.2% | VFD=APAGADO",
        "serial_dry": "[RIEGO] Raíz Seca 6.80mA (17.5% < 36%) + NASA OK -> BOMBA VFD ENCENDIDA",
        "serial_cut": "[NAMUR NE43] ¡CABLE CORTADO 0.00mA (<3.6mA)! GPIO27 BLOQUEA BOMBA -> NASA!",
        "serial_ack": "[CONFIRMACIÓN] Lazo restaurado 12.00mA (50.0%) -> Enclavamiento liberado.",
        "end_kicker": "ADAPTACIÓN CLIMÁTICA AGRÍCOLA ABIERTA Y MECATRÓNICA RURAL IIoT",
        "end_sub": "Ciencia de la NASA en Órbita. Precisión Mecatrónica en la Raíz.",
        "end_team": "EQUIPO INANNA: Fabio M. Medina Rojas • Agustín A. Debia • Iván D. Coria",
        "end_loc": "Origen: Río Cuarto, Córdoba  |  Sede Oficial: Santa Rosa de Calamuchita, AR",
        "end_stats": [("-38%", "Agua Dulce Ahorrada"), ("-34%", "Energía Bomba VFD"), ("< 4 ms", "ESP-NOW sin Router"), ("0 Inund.", "Seguridad NAMUR NE43")]
    },
    "pt": {
        "vo": [
            (0.18, 4.95, "De Río Cuarto e Calamuchita, a Equipe INANNA apresenta o TERRA-SHIFT SCADA."),
            (5.55, 6.20, "Satélites NASA ao vivo guiam culturas resilientes e nosso ESP32 sem internet lê sondas de quatro a vinte miliamperes."),
            (12.15, 8.15, "Veja nosso código ESP32 em um cabo rompido: cai a zero miliamperes, trava a bomba e assume o backup da NASA."),
            (20.75, 3.85, "Reparado a doze miliamperes, poupando trinta e oito por cento de água."),
            (24.95, 3.65, "Ciência da NASA em órbita, precisão na raiz!")
        ],
        "top_kicker": "NASA SPACE APPS 2026 • DESAFIO FIELD SHIFT • RÍO CUARTO → SEDE SANTA ROSA DE CALAMUCHITA",
        "s1_title": "TELEMETRIA ORBITAL NASA → MECATRÔNICA ESP32 SEM INTERNET",
        "s1_sub": "20 Anos de NASA POWER + MODIS + SMAP Guiando a Transição Agrícola 2050",
        "s1_chart": "SÉRIE NASA POWER + SMAP (2004–2024): +1.8 °C CALOR • -31% CHUVA",
        "s1_crops": "MATRIZ DE TRANSIÇÃO DE CULTURAS 2050 (CÓRDOBA)",
        "crops": [("Sorgo Granífero", 94, (16,185,129)), ("Grão-de-Bico", 96, (16,185,129)), ("Oliveira Intensiva", 95, (0,184,230)), ("Videira Serrana", 92, (56,189,248)), ("Milho Sequeiro", 52, (239,68,68))],
        "s1_t2m_lbl": "Pico Térmico T2M_MAX (>41.3 °C)",
        "s1_gwet_lbl": "Umidade SMAP GWETROOT (46.2%)",
        "s1_impact": "IMPACTO GOTEJAMENTO + INVERSOR VFD:  -38% ÁGUA  |  -34% ENERGIA",
        "ap_bar": "http://192.168.4.1 • REDE: INANNA-TERRASHIFT-AP • MODO CAMPO SEM SINAL",
        "esp_title": "Concentrador Rural ESP32",
        "esp_sub": "Laço 24V 4–20 mA Kirchhoff (165 Ω) + Fusão NASA SMAP",
        "banner_nom": "STATUS: OPERAÇÃO NORMAL — UMIDADE IDEAL",
        "banner_dry": "STATUS: RAIZ SECA (17.5%) — IRRIGAÇÃO VFD LIGADA",
        "banner_cut": "CRÍTICO: CABO ROMPIDO (0.00 mA) — BOMBA TRAVADA + NASA!",
        "banner_ack": "STATUS: LAÇO REPARADO (50.0%) — ALARME CONFIRMADO",
        "m_labels": ["LAÇO SOLO (4–20mA)", "NASA GWETROOT", "PRESSÃO GOTEJO", "VAZÃO BOMBA VFD"],
        "sub_open": "LAÇO ABERTO <3.6mA!", "sub_root": "Raiz", "sub_bkp": "BACKUP ATIVO!", "sub_sync": "Sincronia SMAP OK",
        "sub_lock": "GPIO27 TRAVADO!", "sub_on": "GPIO26: LIGADO", "sub_off": "GPIO26: DESLIGADO",
        "osc_hdr": "OSCILOSCÓPIO 4–20 mA ADS1115  |  --- PISO NAMUR 3.60 mA",
        "node_list": ["Nó #01 Videira (A4:CF:01)", "Nó #02 Oliveira (A4:CF:02)", "Nó #03 Grão-de-Bico (A4:CF:03)"],
        "gw_box": ("ESP32 CENTRAL", "MAC 24:6F:28:01", "CLP + SINC NASA"),
        "sim_btns": ["Nominal (11.68mA)", "Raiz Seca (6.80mA)", "Cortar Cabo (0mA)", "Reparar + ACK (12mA)"],
        "ide_title": "EXECUÇÃO AO VIVO DO CÓDIGO C++ ESP32 (esp32_gateway_scada_modbus.ino)",
        "mesh_title": "REDE RURAL ESP-NOW AES-128 (2.4 ms • ZERO INTERNET) → MODBUS :502",
        "serial_title": "MONITOR SERIAL USB (115200 BAUDS) E REGISTRADORES MODBUS",
        "serial_nom": "[ESP-NOW] Nó#01 (<2.4ms) | I=11.68mA (48.0%) | NASA=46.2% | VFD=DESLIGADO",
        "serial_dry": "[IRRIGAÇÃO] Raiz Seca 6.80mA (17.5% < 36%) + NASA OK -> BOMBA VFD LIGADA",
        "serial_cut": "[NAMUR NE43] CABO ROMPIDO 0.00mA (<3.6mA)! GPIO27 TRAVA BOMBA -> NASA!",
        "serial_ack": "[CONFIRMAÇÃO] Laço restaurado 12.00mA (50.0%) -> Bloqueio liberado.",
        "end_kicker": "ADAPTAÇÃO CLIMÁTICA AGRÍCOLA ABERTA E MECATRÔNICA RURAL IIoT",
        "end_sub": "Ciência da NASA em Órbita. Precisão Mecatrônica na Raiz.",
        "end_team": "EQUIPE INANNA: Fabio M. Medina Rojas • Agustín A. Debia • Iván D. Coria",
        "end_loc": "Origem: Río Cuarto, Córdoba  |  Sede Oficial: Santa Rosa de Calamuchita, AR",
        "end_stats": [("-38%", "Água Doce Poupada"), ("-34%", "Energia Bomba VFD"), ("< 4 ms", "ESP-NOW sem Roteador"), ("0 Alag.", "Segurança NAMUR NE43")]
    }
}

def load_font(name, size):
    p = os.path.join(r"C:\Windows\Fonts", name)
    if os.path.exists(p):
        return ImageFont.truetype(p, size)
    return ImageFont.load_default()

F_H1 = load_font("segoeuib.ttf", 46)
F_H2 = load_font("segoeuib.ttf", 32)
F_H3 = load_font("segoeuib.ttf", 23)
F_B  = load_font("segoeui.ttf", 21)
F_BS = load_font("segoeuib.ttf", 18)
F_SM = load_font("segoeui.ttf", 16)
F_M_LG = load_font("consolab.ttf", 34)
F_M_MD = load_font("consolab.ttf", 20)
F_M_SM = load_font("consola.ttf", 16)

ISO_IMG = Image.open(os.path.join(ASSETS_DIR, "inanna-isotipo.jpg")).convert("RGB").resize((52, 52), Image.LANCZOS)
LOGO_HORIZ = Image.open(os.path.join(ASSETS_DIR, "inanna-logo-horizontal.jpg")).convert("RGB")
lh_w = 420
lh_h = int(LOGO_HORIZ.height * (lh_w / LOGO_HORIZ.width))
LOGO_HORIZ = LOGO_HORIZ.resize((lh_w, lh_h), Image.LANCZOS)

def decode_mp3_trimmed(mp3_path):
    raw_p = subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-i", mp3_path, "-f", "s16le", "-acodec", "pcm_s16le", "-ar", str(SR), "-ac", "1", "pipe:1"],
        capture_output=True
    )
    pcm = np.frombuffer(raw_p.stdout, dtype=np.int16).astype(np.float32) / 32768.0
    if len(pcm) == 0:
        return pcm
    # Trim leading/trailing near-silence (< 0.008 amplitude)
    idx = np.where(np.abs(pcm) > 0.008)[0]
    if len(idx) > 0:
        s = max(0, idx[0] - int(0.03 * SR))
        e = min(len(pcm), idx[-1] + int(0.06 * SR))
        pcm = pcm[s:e]
    return pcm

async def prepare_audio_mix(lang):
    voice = VOICES[lang]
    vo_list = V_TEXT[lang]["vo"]
    total_samples = int(DURATION * SR)
    t_arr = np.arange(total_samples, dtype=np.float32) / SR

    # Warm inspiring cinematic ambient space + mechatronics pad (D2, A2, E3, F#3, A3)
    pad = (
        0.28 * np.sin(2 * np.pi * 73.42 * t_arr) +
        0.24 * np.sin(2 * np.pi * 110.00 * t_arr) +
        0.18 * np.sin(2 * np.pi * 164.81 * t_arr) +
        0.15 * np.sin(2 * np.pi * 185.00 * t_arr) +
        0.12 * np.sin(2 * np.pi * 220.00 * t_arr) * (0.65 + 0.35 * np.sin(2 * np.pi * 0.22 * t_arr))
    )
    # Fade in 0.8s, fade out last 1.2s
    env = np.ones_like(t_arr)
    fi = int(0.8 * SR)
    fo = int(1.2 * SR)
    env[:fi] = np.linspace(0.0, 1.0, fi)
    env[-fo:] = np.linspace(1.0, 0.0, fo)
    mix = pad * env * 0.075  # Subtle -22 dB background pad

    # Subtle SCADA click at 5.5s (Dry Root), crisp NAMUR warning double-beep at 12.15s (Wire Cut), positive chime at 20.75s (ACK)
    def add_tone(start_s, dur_s, freq, amp=0.11):
        i0 = int(start_s * SR)
        n = int(dur_s * SR)
        if i0 + n < total_samples:
            tt = np.arange(n, dtype=np.float32) / SR
            te = np.exp(-tt * 12.0)
            mix[i0:i0+n] += amp * np.sin(2 * np.pi * freq * tt) * te

    add_tone(5.48, 0.16, 660.0, 0.09)
    add_tone(12.05, 0.18, 880.0, 0.13)
    add_tone(12.26, 0.22, 698.46, 0.13)
    add_tone(20.68, 0.20, 587.33, 0.09)
    add_tone(20.84, 0.28, 880.0, 0.10)

    # Generate & place each VO clip inside its exact scene window
    vtt_lines = ["WEBVTT\n"]
    rates = ["+4%", "+10%", "+16%", "+22%", "+28%"]
    for idx, (start_s, max_d, text) in enumerate(vo_list, start=1):
        tmp_mp3 = os.path.join(SCRATCH, f"tmp_{lang}_{idx}.mp3")
        pcm = None
        for r in rates:
            await edge_tts.Communicate(text, voice=voice, rate=r).save(tmp_mp3)
            pcm = decode_mp3_trimmed(tmp_mp3)
            dur = len(pcm) / SR
            if dur <= max_d:
                break
        if len(pcm) / SR > max_d:
            pcm = pcm[:int(max_d * SR)]
        dur = len(pcm) / SR
        print(f"  [{lang.upper()}] VO Act {idx}: {dur:.2f}s / window {max_d:.2f}s @ {start_s:.2f}s")
        i0 = int(start_s * SR)
        i1 = min(total_samples, i0 + len(pcm))
        # Normalize voice cleanly to 0.88 peak
        pk = np.max(np.abs(pcm)) if len(pcm) > 0 else 1.0
        if pk > 0.01:
            pcm = pcm * (0.88 / pk)
        mix[i0:i1] += pcm[:i1 - i0]

        def fmt_vtt(sec):
            mm = int(sec // 60)
            ss = sec - mm * 60
            return f"00:{mm:02d}:{ss:06.3f}"
        vtt_lines.append(f"{idx}\n{fmt_vtt(start_s)} --> {fmt_vtt(start_s + dur)}\n{text}\n")

    mix = np.clip(mix, -0.98, 0.98)
    wav_path = os.path.join(SCRATCH, f"mix_{lang}.wav")
    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes((mix * 32767.0).astype(np.int16).tobytes())

    vtt_path = os.path.join(VIDEO_DIR, f"subs_{lang}.vtt")
    with open(vtt_path, "w", encoding="utf-8") as f:
        f.write("\n".join(vtt_lines))
    return wav_path

def draw_top_chrome(dr, img, d, t):
    dr.rectangle([0, 0, W, 68], fill=(11, 17, 26))
    dr.line([(0, 68), (W, 68)], fill=(34, 52, 72), width=2)
    img.paste(ISO_IMG, (28, 8))
    dr.text((94, 12), "TERRA-SHIFT SCADA", font=F_H3, fill=(255, 255, 255))
    dr.text((94, 39), d["top_kicker"], font=F_SM, fill=(0, 184, 230))
    # Timer pill
    pill = f"00:{int(t):02d} / 00:29"
    dr.rounded_rectangle([W - 190, 16, W - 28, 52], radius=8, fill=(18, 28, 40), outline=(0, 184, 230), width=1)
    dr.text((W - 172, 24), pill, font=F_M_MD, fill=(134, 239, 172))

def draw_scene_1_orbital(dr, img, d, t):
    prog = min(1.0, t / 4.6)
    dr.text((48, 92), d["s1_title"], font=F_H2, fill=(255, 255, 255))
    dr.text((48, 134), d["s1_sub"], font=F_B, fill=(148, 163, 184))

    # Left Card: Orbital Radar + NASA POWER 20-year chart
    dr.rounded_rectangle([48, 182, 980, 950], radius=18, fill=(16, 23, 34), outline=(38, 58, 82), width=2)
    dr.text((78, 206), d["s1_chart"], font=F_BS, fill=(56, 189, 248))

    # Orbital Coordinate Lock Box (Río Cuarto & Santa Rosa de Calamuchita)
    dr.rounded_rectangle([78, 248, 950, 445], radius=12, fill=(10, 16, 25), outline=(28, 48, 68), width=1)
    # Grid lines
    for gx in range(120, 940, 80):
        dr.line([(gx, 248), (gx, 445)], fill=(18, 30, 44), width=1)
    for gy in range(275, 440, 42):
        dr.line([(78, gy), (950, gy)], fill=(18, 30, 44), width=1)

    # Animated radar rings on Río Cuarto & Calamuchita
    r_pulse = int(16 + 26 * ((t * 1.6) % 1.0))
    cx1, cy1 = 310, 365  # Río Cuarto
    cx2, cy2 = 640, 320  # Santa Rosa de Calamuchita
    dr.ellipse([cx1 - r_pulse, cy1 - r_pulse, cx1 + r_pulse, cy1 + r_pulse], outline=(16, 185, 129), width=2)
    dr.ellipse([cx1 - 7, cy1 - 7, cx1 + 7, cy1 + 7], fill=(16, 185, 129))
    dr.text((cx1 + 16, cy1 - 22), "Río Cuarto (-33.12°, -64.35°)", font=F_BS, fill=(134, 239, 172))
    dr.text((cx1 + 16, cy1 + 2), "SMAP GWETROOT: 46.2%", font=F_M_SM, fill=(203, 213, 225))

    dr.ellipse([cx2 - r_pulse, cy2 - r_pulse, cx2 + r_pulse, cy2 + r_pulse], outline=(0, 184, 230), width=2)
    dr.ellipse([cx2 - 7, cy2 - 7, cx2 + 7, cy2 + 7], fill=(0, 184, 230))
    dr.text((cx2 - 90, cy2 + 18), "Santa Rosa de Calamuchita (-32.07°)", font=F_BS, fill=(56, 189, 248))
    dr.line([(cx1, cy1), (cx2, cy2)], fill=(0, 184, 230), width=2)

    # Animated 20-year Temperature Rise & Moisture Drop Chart
    dr.rounded_rectangle([78, 470, 950, 918], radius=12, fill=(10, 15, 23), outline=(28, 45, 64), width=1)
    temps = [35.2, 35.8, 36.1, 35.6, 36.9, 37.4, 36.8, 38.1, 37.9, 38.8, 39.4, 38.9, 40.2, 40.8, 41.3]
    gwet  = [64, 62, 60, 63, 58, 55, 57, 52, 53, 49, 47, 50, 46, 44, 46]
    n_vis = max(2, int(len(temps) * min(1.0, prog * 1.25)))
    pts_t, pts_g = [], []
    for i in range(n_vis):
        x = 115 + int((800 / (len(temps) - 1)) * i)
        yt = 865 - int(((temps[i] - 33.0) / 10.0) * 340)
        yg = 865 - int(((gwet[i] - 30.0) / 45.0) * 340)
        pts_t.append((x, yt))
        pts_g.append((x, yg))
    if len(pts_t) > 1:
        dr.line(pts_t, fill=(249, 115, 22), width=4)
        dr.line(pts_g, fill=(0, 184, 230), width=4)
    dr.text((105, 492), d["s1_t2m_lbl"], font=F_BS, fill=(251, 146, 60))
    dr.text((520, 492), d["s1_gwet_lbl"], font=F_BS, fill=(56, 189, 248))
    dr.text((105, 882), "2004", font=F_M_SM, fill=(148, 163, 184))
    dr.text((875, 882), "2024", font=F_M_SM, fill=(148, 163, 184))

    # Right Card: 2050 Crop Transition Bars
    dr.rounded_rectangle([1012, 182, 1872, 950], radius=18, fill=(16, 23, 34), outline=(38, 58, 82), width=2)
    dr.text((1044, 206), d["s1_crops"], font=F_BS, fill=(134, 239, 172))
    for idx, (cname, score, col) in enumerate(d["crops"]):
        y0 = 268 + idx * 116
        dr.rounded_rectangle([1044, y0, 1840, y0 + 94], radius=12, fill=(11, 17, 26), outline=(30, 45, 62), width=1)
        dr.text((1068, y0 + 14), cname, font=F_H3, fill=(241, 245, 249))
        anim_s = int(score * min(1.0, prog * 1.15))
        dr.text((1745, y0 + 14), f"{anim_s}%", font=F_M_MD, fill=col)
        bar_w = int(740 * (anim_s / 100.0))
        dr.rounded_rectangle([1068, y0 + 54, 1808, y0 + 76], radius=8, fill=(24, 34, 48))
        if bar_w > 8:
            dr.rounded_rectangle([1068, y0 + 54, 1068 + bar_w, y0 + 76], radius=8, fill=col)

    # Bottom Impact Strip inside Right Card
    dr.rounded_rectangle([1044, 858, 1840, 924], radius=12, fill=(12, 38, 34), outline=(16, 185, 129), width=2)
    dr.text((1068, 878), d["s1_impact"], font=F_BS, fill=(134, 239, 172))

def draw_esp32_emulator_scenes(dr, img, d, t):
    # Determine current ESP32 mode from timeline:
    # 5.4..6.5: nominal (11.68 mA) -> cursor moves to Dry Root
    # 6.5..12.0: dry (6.80 mA, VFD ON)
    # 12.0..20.6: cut (0.00 mA, NAMUR NE43 FAULT, PUMP LOCKED + NASA BACKUP!)
    # 20.6..24.8: ack (12.00 mA, REPAIRED & ARMED)
    if t < 6.4:
        mode = "nom"
        ma, pct, press, flow = 11.68, 48.0, 1.80, 0.0
    elif t < 12.0:
        mode = "dry"
        ma, pct, press, flow = 6.80, 17.5, 4.20, 22.4
    elif t < 20.6:
        mode = "cut"
        ma, pct, press, flow = 0.00, 0.0, 0.00, 0.0
    else:
        mode = "ack"
        ma, pct, press, flow = 12.00, 50.0, 1.95, 0.0

    is_cut = (mode == "cut")
    is_dry = (mode == "dry")

    # LEFT PANEL: Authentic INANNA Embedded ESP32 Web UI (http://192.168.4.1)
    lx0, ly0, lx1, ly1 = 42, 90, 770, 962
    border_col = (239, 68, 68) if is_cut else (40, 58, 78)
    dr.rounded_rectangle([lx0, ly0, lx1, ly1], radius=20, fill=(18, 24, 33), outline=border_col, width=3 if is_cut else 2)

    # URL Bar
    dr.rounded_rectangle([lx0 + 20, ly0 + 18, lx1 - 20, ly0 + 58], radius=9, fill=(10, 15, 22), outline=(34, 50, 68), width=1)
    dr.ellipse([lx0 + 34, ly0 + 32, lx0 + 46, ly0 + 44], fill=(34, 197, 94))
    dr.text((lx0 + 56, ly0 + 28), d["ap_bar"], font=F_M_SM, fill=(134, 239, 172))

    # ESP32 Card Title
    dr.text((lx0 + 28, ly0 + 72), d["esp_title"], font=F_H2, fill=(24, 144, 255))
    dr.text((lx0 + 28, ly0 + 112), d["esp_sub"], font=F_SM, fill=(148, 163, 184))

    # Status Banner
    if is_cut:
        b_bg, b_fg, b_txt = (127, 29, 29), (254, 202, 202), d["banner_cut"]
    elif is_dry:
        b_bg, b_fg, b_txt = (120, 53, 15), (253, 230, 138), d["banner_dry"]
    elif mode == "ack":
        b_bg, b_fg, b_txt = (20, 83, 45), (134, 239, 172), d["banner_ack"]
    else:
        b_bg, b_fg, b_txt = (20, 83, 45), (134, 239, 172), d["banner_nom"]
    dr.rounded_rectangle([lx0 + 20, ly0 + 146, lx1 - 20, ly0 + 200], radius=10, fill=b_bg, outline=b_fg, width=2)
    dr.text((lx0 + 34, ly0 + 162), b_txt, font=F_BS, fill=b_fg)

    # 4 Gauge Cards
    cards = [
        (d["m_labels"][0], f"{ma:.2f} mA", d["sub_open"] if is_cut else f"{pct:.1f}% {d['sub_root']}", (239,68,68) if is_cut else (0,184,230)),
        (d["m_labels"][1], "46.2%", d["sub_bkp"] if is_cut else d["sub_sync"], (253,230,138) if is_cut else (96,165,250)),
        (d["m_labels"][2], f"{press:.2f} Bar", f"V={(ma*0.165):.3f}V (165Ω)", (0,184,230)),
        (d["m_labels"][3], f"{flow:.1f} m³/h", d["sub_lock"] if is_cut else (d["sub_on"] if is_dry else d["sub_off"]), (239,68,68) if is_cut else ((253,230,138) if is_dry else (134,239,172)))
    ]
    for ci, (lbl, val, sub, vcol) in enumerate(cards):
        col_i, row_i = ci % 2, ci // 2
        cx0 = lx0 + 20 + col_i * 348
        cy0 = ly0 + 216 + row_i * 124
        dr.rounded_rectangle([cx0, cy0, cx0 + 336, cy0 + 112], radius=12, fill=(23, 32, 43), outline=(38, 54, 72), width=1)
        dr.text((cx0 + 16, cy0 + 12), lbl, font=F_SM, fill=(148, 163, 184))
        dr.text((cx0 + 16, cy0 + 38), val, font=F_M_LG, fill=vcol)
        dr.text((cx0 + 16, cy0 + 82), sub, font=F_M_SM, fill=(203, 213, 225))

    # Oscilloscope Box (4-20 mA Live Trace vs 3.6 mA NAMUR Red Floor)
    ox0, oy0, ox1, oy1 = lx0 + 20, ly0 + 474, lx1 - 20, ly0 + 694
    dr.rounded_rectangle([ox0, oy0, ox1, oy1], radius=12, fill=(11, 16, 23), outline=(36, 52, 70), width=1)
    dr.text((ox0 + 14, oy0 + 10), d["osc_hdr"], font=F_M_SM, fill=(148, 163, 184))
    # NASA reference dashed line
    ynasa = oy1 - 22 - int((11.39 / 20.0) * 160)
    dr.line([(ox0 + 12, ynasa), (ox1 - 12, ynasa)], fill=(59, 130, 246), width=1)
    # 3.60 mA NAMUR red floor
    ynamur = oy1 - 22 - int((3.60 / 20.0) * 160)
    dr.line([(ox0 + 12, ynamur), (ox1 - 12, ynamur)], fill=(239, 68, 68), width=2)

    # Build dynamic 40-point waveform up to current time `t`
    wave_pts = []
    for k in range(44):
        tk = t - (43 - k) * 0.14
        if tk < 6.4: vk = 11.68 + 0.08 * math.sin(tk * 5.0)
        elif tk < 12.0: vk = 6.80 + 0.08 * math.sin(tk * 6.0)
        elif tk < 20.6: vk = 0.00
        else: vk = 12.00 + 0.07 * math.sin(tk * 5.0)
        xk = ox0 + 14 + int(((ox1 - ox0 - 28) / 43.0) * k)
        yk = oy1 - 22 - int((vk / 20.0) * 160)
        wave_pts.append((xk, yk))
    dr.line(wave_pts, fill=(239, 68, 68) if is_cut else (0, 184, 230), width=4)

    # 4 Simulation Buttons + Animated Cursor
    active_idx = {"nom": 0, "dry": 1, "cut": 2, "ack": 3}[mode]
    btn_centers = []
    for bi, btxt in enumerate(d["sim_btns"]):
        bcol, brow = bi % 2, bi // 2
        bx0 = lx0 + 20 + bcol * 348
        by0 = ly0 + 710 + brow * 72
        btn_centers.append((bx0 + 168, by0 + 29))
        if bi == active_idx:
            bfill = (220, 38, 38) if bi == 2 else (14, 116, 144)
            bout = (254, 202, 202) if bi == 2 else (0, 184, 230)
        else:
            bfill, bout = (16, 23, 32), (42, 58, 76)
        dr.rounded_rectangle([bx0, by0, bx0 + 336, by0 + 58], radius=10, fill=bfill, outline=bout, width=2)
        dr.text((bx0 + 18, by0 + 18), btxt, font=F_BS, fill=(255, 255, 255))

    # RIGHT TOP: ESP-NOW P2P Mesh Topology
    rx0, rx1 = 798, 1878
    dr.rounded_rectangle([rx0, 90, rx1, 272], radius=18, fill=(18, 24, 33), outline=(38, 56, 76), width=2)
    dr.text((rx0 + 22, 106), d["mesh_title"], font=F_BS, fill=(56, 189, 248))
    node_names = d["node_list"]
    gw_x, gw_y = rx0 + 650, 196
    for ni, nlbl in enumerate(node_names):
        ny = 152 + ni * 42
        nx = rx0 + 28
        cut_node = (ni == 0 and is_cut)
        dr.rounded_rectangle([nx, ny - 14, nx + 270, ny + 16], radius=6, fill=(68,18,22) if cut_node else (19,32,46), outline=(239,68,68) if cut_node else (44,68,92), width=2)
        dr.text((nx + 12, ny - 9), nlbl, font=F_M_SM, fill=(241, 245, 249))
        dr.line([(nx + 270, ny), (gw_x - 90, gw_y)], fill=(239,68,68) if cut_node else (0,184,230), width=2)
        # Flying AES-128 packet
        p = ((t * 1.4 + ni * 0.33) % 1.0)
        px = int((nx + 270) + (gw_x - 90 - (nx + 270)) * p)
        py = int(ny + (gw_y - ny) * p)
        dr.ellipse([px - 5, py - 5, px + 5, py + 5], fill=(239,68,68) if cut_node else (34,197,94))

    dr.rounded_rectangle([gw_x - 90, gw_y - 38, gw_x + 120, gw_y + 38], radius=10, fill=(15, 36, 56), outline=(0, 184, 230), width=2)
    dr.text((gw_x - 74, gw_y - 24), d["gw_box"][0], font=F_M_MD, fill=(56, 189, 248))
    dr.text((gw_x - 74, gw_y + 4), d["gw_box"][1], font=F_M_SM, fill=(203, 213, 225))
    dr.line([(gw_x + 120, gw_y), (rx1 - 210, gw_y)], fill=(251, 191, 36), width=3)
    dr.rounded_rectangle([rx1 - 210, gw_y - 36, rx1 - 24, gw_y + 36], radius=10, fill=(24, 34, 46), outline=(251, 191, 36), width=2)
    dr.text((rx1 - 194, gw_y - 22), "MODBUS :502", font=F_M_MD, fill=(251, 191, 36))
    dr.text((rx1 - 194, gw_y + 6), d["gw_box"][2], font=F_M_SM, fill=(134, 239, 172))

    # RIGHT MIDDLE: Live C++ Firmware Execution Window
    dr.rounded_rectangle([rx0, 288, rx1, 706], radius=18, fill=(14, 20, 29), outline=(38, 56, 76), width=2)
    dr.text((rx0 + 22, 304), d["ide_title"], font=F_BS, fill=(56, 189, 248))
    code_lines = [
        ("60", "float volts = ads.computeVolts(ads.readADC_Differential_0_1());", "all"),
        ("61", "float loopMa = (volts / 165.0f) * 1000.0f; // Kirchhoff 165 Ohm", "all"),
        ("64", "// NAMUR NE43 Live-Zero Diagnostic (< 3.60 mA = Cut Field Wire)", "none"),
        ("65", "if (loopMa < 3.60f) {", "cut"),
        ("66", "  mb.coil00001_pumpEnable    = false; // PREVENT FLOODING!", "cut"),
        ("67", "  mb.coil00002_safetyTripped = true;", "cut"),
        ("68", "  digitalWrite(PIN_VFD_PUMP_RELAY, LOW);", "cut"),
        ("69", "  digitalWrite(PIN_SAFETY_INTERLOCK, HIGH); // -> NASA GWETROOT", "cut"),
        ("73", "} else if (!mb.coil00002_safetyTripped) {", "ok"),
        ("74", "  bool irrigate = (soilPct < 36.0f); // Validated w/ NASA SMAP", "dry"),
        ("80", "  digitalWrite(PIN_VFD_PUMP_RELAY, irrigate ? HIGH : LOW);", "dry_or_nom"),
        ("81", "}", "none"),
        ("98", "esp_now_send(GATEWAY_MAC, (uint8_t*)&pkt, sizeof(pkt)); // AES-128", "all")
    ]
    for li, (ln, txt, tag) in enumerate(code_lines):
        ly = 342 + li * 27
        hl = None
        if tag == "cut" and is_cut: hl = (95, 22, 28)
        elif tag == "dry" and is_dry: hl = (85, 52, 14)
        elif tag in ("ok", "dry_or_nom") and mode in ("nom", "ack"): hl = (16, 62, 42)
        elif tag == "dry_or_nom" and is_dry: hl = (85, 52, 14)
        if hl:
            dr.rectangle([rx0 + 14, ly - 2, rx1 - 14, ly + 23], fill=hl)
        dr.text((rx0 + 24, ly), ln, font=F_M_SM, fill=(100, 116, 139))
        dr.text((rx0 + 68, ly), txt, font=F_M_SM, fill=(241, 245, 249))

    # RIGHT BOTTOM: USB Serial Monitor (115200 baud) + Modbus Register Strip
    dr.rounded_rectangle([rx0, 722, rx1, 962], radius=18, fill=(9, 14, 21), outline=(38, 56, 76), width=2)
    dr.text((rx0 + 22, 738), d["serial_title"], font=F_BS, fill=(134, 239, 172))
    logs = [(d["serial_nom"], (134, 239, 172))]
    if t >= 6.4: logs.append((d["serial_dry"], (253, 230, 138)))
    if t >= 12.0: logs.append((d["serial_cut"], (252, 165, 165)))
    if t >= 20.6: logs.append((d["serial_ack"], (134, 239, 172)))
    for si, (stxt, scol) in enumerate(logs[-4:]):
        dr.text((rx0 + 24, 774 + si * 28), stxt, font=F_M_SM, fill=scol)

    mb_line = (
        f"MODBUS TCP:502  |  30001={int(ma*100):04d}  |  30003(NASA)=4620  |  "
        f"30005(NAMUR)={'2-FAULT' if is_cut else '0-OK'}  |  00001(VFD)={'1-ON' if is_dry else '0-OFF'}  |  "
        f"00002(LOCK)={'1-LOCKED' if is_cut else '0-ARMED'}"
    )
    dr.rounded_rectangle([rx0 + 18, 906, rx1 - 18, 948], radius=8, fill=(20, 30, 44))
    dr.text((rx0 + 30, 918), mb_line, font=F_M_SM, fill=(251, 191, 36))

    # Draw animated cursor moving between simulation buttons!
    cx, cy = btn_centers[active_idx]
    dr.polygon([(cx, cy), (cx + 22, cy + 12), (cx + 10, cy + 16), (cx + 6, cy + 28)], fill=(255, 255, 255), outline=(0, 0, 0))

def draw_scene_5_finale(dr, img, d, t):
    # Centered Inspiring Grand Finale (24.8s - 29.0s)
    lx = (W - LOGO_HORIZ.width) // 2
    dr.rounded_rectangle([lx - 8, 126, lx + LOGO_HORIZ.width + 8, 126 + LOGO_HORIZ.height + 8], radius=14, fill=(14,22,34), outline=(0,184,230), width=2)
    img.paste(LOGO_HORIZ, (lx, 130))

    def center_txt(y, txt, fnt, col):
        bb = dr.textbbox((0, 0), txt, font=fnt)
        tw = bb[2] - bb[0]
        dr.text(((W - tw) // 2, y), txt, font=fnt, fill=col)

    center_txt(305, d["end_kicker"], F_BS, (0, 184, 230))
    center_txt(348, "TERRA-SHIFT SCADA", F_H1, (255, 255, 255))
    center_txt(416, d["end_sub"], F_H2, (134, 239, 172))

    # 4 Impact KPI Cards
    for idx, (big_v, lbl) in enumerate(d["end_stats"]):
        kx = 170 + idx * 405
        dr.rounded_rectangle([kx, 498, kx + 375, 668], radius=16, fill=(17, 26, 38), outline=(0, 184, 230), width=2)
        center_box = dr.textbbox((0, 0), big_v, font=F_H1)
        bw = center_box[2] - center_box[0]
        dr.text((kx + (375 - bw) // 2, 526), big_v, font=F_H1, fill=(56, 189, 248))
        lb_box = dr.textbbox((0, 0), lbl, font=F_BS)
        lw = lb_box[2] - lb_box[0]
        dr.text((kx + (375 - lw) // 2, 608), lbl, font=F_BS, fill=(226, 232, 240))

    dr.rounded_rectangle([250, 718, W - 250, 868], radius=16, fill=(14, 21, 31), outline=(42, 64, 88), width=2)
    center_txt(744, d["end_team"], F_H3, (255, 255, 255))
    center_txt(788, d["end_loc"], F_B, (148, 163, 184))
    center_txt(828, "https://inanna-company.github.io/terra-shift-scada/", F_M_MD, (0, 184, 230))

def render_video_for_lang(lang, wav_path):
    d = V_TEXT[lang]
    out_mp4 = os.path.join(VIDEO_DIR, f"terra_shift_{lang}.mp4")
    poster_jpg = os.path.join(VIDEO_DIR, f"poster_{lang}.jpg")

    cmd = [
        FFMPEG, "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "pipe:0",
        "-i", wav_path,
        "-c:v", "h264_mf", "-b:v", "3200k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        "-t", "29.0",
        out_mp4
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    for f_idx in range(TOTAL_FRAMES):
        t = f_idx / FPS
        img = Image.new("RGB", (W, H), (8, 12, 18))
        dr = ImageDraw.Draw(img)
        draw_top_chrome(dr, img, d, t)

        if t < 5.4:
            draw_scene_1_orbital(dr, img, d, t)
        elif t < 24.8:
            draw_esp32_emulator_scenes(dr, img, d, t)
        else:
            draw_scene_5_finale(dr, img, d, t)

        # Bottom Caption Bar (Synced with Active VO)
        active_cap = ""
        for s0, max_d, cap_txt in d["vo"]:
            if s0 <= t <= s0 + max_d + 0.35:
                active_cap = cap_txt
                break
        if active_cap:
            dr.rounded_rectangle([160, 982, W - 160, 1054], radius=12, fill=(6, 10, 16), outline=(36, 56, 78), width=1)
            bb = dr.textbbox((0, 0), active_cap, font=F_B)
            cw = bb[2] - bb[0]
            dr.text(((W - cw) // 2, 1004), active_cap, font=F_B, fill=(248, 250, 252))

        if f_idx == int(14.5 * FPS):  # Dramatic wire-cut ESP32 frame as poster!
            img.save(poster_jpg, quality=92)

        proc.stdin.write(img.tobytes())

    proc.stdin.close()
    err = ""
    proc.wait()
    if proc.returncode != 0:
        raise RuntimeError(f"FFmpeg failed for {lang}: {err[-600:]}")
    sz_mb = os.path.getsize(out_mp4) / (1024 * 1024)
    print(f"[SUCCESS] {out_mp4} -> {sz_mb:.2f} MB")

async def main():
    for lang in ("en", "es", "pt"):
        print(f"\n=== BUILDING FULL HD 29.0s VIDEO [{lang.upper()}] ===")
        wav_p = await prepare_audio_mix(lang)
        render_video_for_lang(lang, wav_p)

if __name__ == "__main__":
    asyncio.run(main())

