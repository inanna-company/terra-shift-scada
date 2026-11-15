# -*- coding: utf-8 -*-
import os
import subprocess
import re
import asyncio
import edge_tts

AUDIO_DIR = r"d:\01 antigraviti varios\nasa\assets\audio"
VIDEO_DIR = r"d:\01 antigraviti varios\nasa\assets\video"
FFMPEG = r"C:\Users\maxi\AppData\Local\CapCut\Apps\1.1.0.95\ffmpeg.exe"
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(VIDEO_DIR, exist_ok=True)

VOICES = {
    "en": "en-US-JennyNeural",
    "es": "es-AR-ElenaNeural",
    "pt": "pt-BR-FranciscaNeural",
}

# 100% Pure Single-Language, Non-Commercial 6-Step Guided Jury Demo (index.html)
DEMO_SCRIPTS = {
    "en": [
        "Hello NASA Space Apps Jury, I am Inanna. From Río Cuarto and Santa Rosa de Calamuchita, we query twenty years of live NASA POWER, MODIS, and SMAP satellite telemetry, tracking rising heat and declining root-zone moisture.",
        "Using twenty-fifty climate projections, we rank ten crops and map their twelve-month phenology calendar. Where traditional rainfed maize suffers heat shock, high-altitude vineyards, olive, chickpea, and sorghum thrive.",
        "In our open-source environmental impact calculator, closed-loop drip irrigation and variable-frequency pump drives save thirty-eight percent of freshwater and thirty-four percent of clean rural energy every season.",
        "Now let us step into an offline rural farm. Our solar ESP-NOW nodes read industrial four-to-twenty milliamp probes. Detecting dry roots at six point eight milliamps confirmed by NASA, we open precision drip irrigation.",
        "Watch closely, judges: we simulate a severed field cable. Basic voltage sensors read zero percent dry and flood the crop. Using NAMUR NE43 live-zero diagnostics, we lock the safety relay instantly and switch to NASA orbital backup.",
        "Once repaired to twelve milliamps and acknowledged, the system rearms, ready for any open Modbus controller. TERRA-SHIFT by Team INANNA: NASA science in orbit, mechatronic precision at the root."
    ],
    "es": [
        "Hola jurado de NASA Space Apps, soy Inanna. Desde Río Cuarto y Santa Rosa de Calamuchita consultamos veinte años en vivo de satélites NASA POWER, MODIS y SMAP, detectando el aumento térmico y la caída de humedad radicular.",
        "Con proyecciones climáticas a dos mil cincuenta evaluamos diez cultivos y su calendario de doce meses. Donde el maíz tradicional sufre golpes de calor, prosperan la vid serrana, el olivo, el garbanzo y el sorgo.",
        "En nuestra calculadora abierta de impacto ambiental, el riego por goteo en lazo cerrado y el bombeo de velocidad variable ahorran treinta y ocho por ciento de agua dulce y treinta y cuatro por ciento de energía eléctrica.",
        "Ahora bajemos al campo sin internet. Nuestros nodos solares inalámbricos leen sondas de cuatro a veinte miliamperios. Al detectar raíz seca en seis coma ocho miliamperios confirmada por la NASA, activamos el riego preciso.",
        "Atención jurado: simulamos un cable cortado en el lote. Un sensor común leería cero por ciento seco e inundaría el cultivo. Con diagnóstico de cero vivo enclavamos el relé de seguridad al instante y activamos el respaldo satelital de la NASA.",
        "Al reparar el lazo a doce miliamperios y confirmar la alarma, todo el sistema se rearma listo para controladores industriales abiertos. TERRA-SHIFT por el Equipo INANNA: ciencia de la NASA en órbita, precisión mecatrónica en la raíz."
    ],
    "pt": [
        "Olá júri do NASA Space Apps, eu sou a Inanna. De Río Cuarto e Santa Rosa de Calamuchita consultamos ao vivo vinte anos de satélites NASA POWER, MODIS e SMAP, detectando o aquecimento e a queda na umidade da raiz.",
        "Com projeções climáticas para dois mil e cinquenta avaliamos dez culturas e seu calendário de doze meses. Onde o milho tradicional sofre choque térmico, prosperam a videira serrana, a oliveira, o grão-de-bico e o sorgo.",
        "Em nossa calculadora aberta de impacto ambiental, o gotejamento em malha fechada e inversores de velocidade variável poupam trinta e oito por cento de água doce e trinta e quatro por cento de energia elétrica rural.",
        "Agora vamos ao campo sem internet. Nossos nós solares sem roteador leem sondas de quatro a vinte miliamperes. Ao detectar raiz seca em seis vírgula oito miliamperes confirmada pela NASA, abrimos a irrigação de precisão.",
        "Atenção jurados: simulamos um cabo rompido na lavoura. Sensores comuns leriam zero por cento seco e inundariam o cultivo. Com diagnóstico de zero vivo travamos o relé de segurança na hora e ativamos o backup orbital da NASA.",
        "Após reparar o laço para doze miliamperes e confirmar o alarme, o sistema rearma pronto para controladores abertos. TERRA-SHIFT pela Equipe INANNA: ciência da NASA em órbita, precisão mecatrônica na raiz."
    ]
}

# 100% Pure Single-Language, Non-Commercial 7-Slide Deck Narration (presentation/deck_7_slides.html)
SLIDE_SCRIPTS = {
    "en": [
        "Welcome to TERRA-SHIFT SCADA, created by Team INANNA from Río Cuarto competing in Santa Rosa de Calamuchita to unite NASA Earth science with offline rural mechatronics.",
        "Farmers face a dual blind spot: shifting heat and rainfall invalidate historical planting dates, nine-kilometer satellite pixels miss local pipe faults, and deep rural fields lack internet.",
        "Our orbital intelligence engine ingests twenty years of live NASA POWER climate data, real-time MODIS and SMAP satellite layers, and twenty-fifty agro-climatic projections.",
        "At the root zone, we deploy industrial four-to-twenty milliamp current loops with live-zero fault diagnostics, routerless encrypted solar nodes, and open industrial communication.",
        "Fusing NASA root-zone soil wetness with ground current loops prevents catastrophic crop flooding when field wires break and pinpoints clogged drip lines.",
        "Our open-source trilingual web platform guides communities through ten-crop transition matrices, twelve-month calendars, water savings calculators, and three complete engineering manuals.",
        "Across Córdoba and global semi-arid regions, TERRA-SHIFT saves thirty-eight percent of freshwater with zero internet required. Thank you judges, we are Team INANNA."
    ],
    "es": [
        "Bienvenidos a TERRA-SHIFT SCADA, creado por el Equipo INANNA desde Río Cuarto compitiendo en Santa Rosa de Calamuchita para unir la ciencia terrestre de la NASA con mecatrónica rural sin internet.",
        "El productor enfrenta un doble punto ciego: el cambio térmico e hídrico invalida las fechas históricas de siembra, el píxel satelital no ve roturas locales de riego y en el campo profundo no hay señal celular.",
        "Nuestro motor orbital integra en vivo veinte años climáticos de NASA POWER, capas satelitales MODIS y SMAP en tiempo real y proyecciones agroclimáticas hacia dos mil cincuenta.",
        "En la raíz desplegamos lazos industriales de cuatro a veinte miliamperios con diagnóstico de cero vivo, nodos solares cifrados punto a punto sin router y telemetría industrial abierta.",
        "Al fusionar la humedad radicular satelital de la NASA con las sondas de corriente evitamos inundaciones catastróficas ante cables cortados y detectamos mangueras de goteo obstruidas.",
        "Nuestra plataforma web abierta entrega matrices de transición para diez cultivos, calendarios de doce meses, calculadora de ahorro hídrico y energético, y tres manuales técnicos completos.",
        "En Córdoba y regiones semiáridas del mundo, TERRA-SHIFT ahorra treinta y ocho por ciento de agua dulce sin depender de internet. Muchas gracias jurado, somos el Equipo INANNA."
    ],
    "pt": [
        "Bem-vindos ao TERRA-SHIFT SCADA, criado pela Equipe INANNA de Río Cuarto competindo em Santa Rosa de Calamuchita para unir a ciência terrestre da NASA com mecatrônica rural sem internet.",
        "O produtor enfrenta um duplo ponto cego: a mudança térmica e hídrica invalida datas históricas de plantio, o pixel orbital não enxerga falhas locais de irrigação e o campo profundo não tem sinal celular.",
        "Nosso motor orbital integra ao vivo vinte anos climáticos da NASA POWER, camadas satelitais MODIS e SMAP em tempo real e projeções agroclimáticas até dois mil e cinquenta.",
        "Na zona radicular implantamos laços industriais de quatro a vinte miliamperes com diagnóstico de zero vivo, nós solares criptografados ponto a ponto sem roteador e telemetria industrial aberta.",
        "Ao fundir a umidade radicular orbital da NASA com sondas de corrente evitamos inundações catastróficas por cabos rompidos e identificamos mangueiras de gotejamento entupidas.",
        "Nossa plataforma web aberta oferece matrizes de transição para dez culturas, calendários de doze meses, calculadora de economia hídrica e energética e três manuais técnicos completos.",
        "Em Córdoba e regiões semiáridas globais, o TERRA-SHIFT poupa trinta e oito por cento de água doce sem depender de internet. Muito obrigada jurados, somos a Equipe INANNA."
    ]
}

# 5-Scene Official <30s Video Scripts with strict per-scene max duration windows:
# Scene windows: S1: 0.20..5.05 (max 4.80s), S2: 5.30..11.05 (max 5.70s),
# S3: 11.30..17.05 (max 5.70s), S4: 17.30..24.05 (max 6.70s), S5: 24.30..28.60 (max 4.25s)
VIDEO_SCENES = {
    "en": [
        (4.80, "From Río Cuarto and Santa Rosa de Calamuchita, Team INANNA presents TERRA-SHIFT SCADA."),
        (5.70, "Twenty years of live NASA POWER, MODIS, and SMAP satellites reveal rising heat and drying roots."),
        (5.70, "Our twenty-fifty climate model shifts vulnerable maize to resilient sorghum, chickpea, and olive—saving thirty-eight percent of water."),
        (6.70, "Offline on the farm, solar ESP-NOW and live-zero milliamp loops lock the pump on broken wires, switching to NASA backup."),
        (4.25, "NASA science in orbit, mechatronic precision at the root. Thank you, Space Apps!")
    ],
    "es": [
        (4.80, "Desde Río Cuarto y Santa Rosa de Calamuchita, el Equipo INANNA presenta TERRA-SHIFT SCADA."),
        (5.70, "Veinte años de satélites NASA POWER, MODIS y SMAP revelan calor extremo y caída de humedad en la raíz."),
        (5.70, "Nuestro modelo dos mil cincuenta guía del maíz vulnerable hacia sorgo, garbanzo y olivo, ahorrando treinta y ocho por ciento de agua."),
        (6.70, "Sin internet rural, nodos solares y lazos de cuatro a veinte miliamperios enclavan la bomba ante cables cortados con respaldo NASA."),
        (4.25, "Ciencia de la NASA en órbita, precisión mecatrónica en la raíz. ¡Gracias, Space Apps!")
    ],
    "pt": [
        (4.80, "De Río Cuarto e Santa Rosa de Calamuchita, a Equipe INANNA apresenta o TERRA-SHIFT SCADA."),
        (5.70, "Vinte anos de satélites NASA POWER, MODIS e SMAP revelam calor extremo e queda de umidade na raiz."),
        (5.70, "Nosso modelo dois mil e cinquenta guia do milho vulnerável ao sorgo, grão-de-bico e oliveira, poupando trinta e oito por cento de água."),
        (6.70, "Sem internet rural, nós solares e laços de quatro a vinte miliamperes travam a bomba em cabos rompidos com backup da NASA."),
        (4.25, "Ciência da NASA em órbita, precisão mecatrônica na raiz. Obrigada, Space Apps!")
    ]
}

def get_duration(path):
    p = subprocess.run([FFMPEG, "-i", path], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", p.stderr)
    if not m:
        return 99.0
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))

async def gen_one(voice, text, out_path, rate="+0%"):
    comm = edge_tts.Communicate(text, voice=voice, rate=rate, pitch="+0Hz")
    await comm.save(out_path)

async def main():
    # 1. Regenerate 18 Guided Demo MP3s + 21 Slide MP3s in parallel batches
    coros = []
    for lang, voice in VOICES.items():
        for idx, txt in enumerate(DEMO_SCRIPTS[lang]):
            coros.append(gen_one(voice, txt, os.path.join(AUDIO_DIR, f"demo_{lang}_{idx}.mp3"), "+2%"))
        for idx, txt in enumerate(SLIDE_SCRIPTS[lang]):
            coros.append(gen_one(voice, txt, os.path.join(AUDIO_DIR, f"slide_{lang}_{idx}.mp3"), "+2%"))
    print(f"Generating {len(coros)} pure-language Demo + Slide MP3 files...")
    # Run in batches of 8 to be fast & gentle on network
    for i in range(0, len(coros), 8):
        await asyncio.gather(*coros[i:i+8])
    print("Demo + Slide MP3s DONE!")

    # 2. Generate 15 per-scene Video Voiceover clips, auto-fitting strictly within max_dur!
    rates_to_try = ["+6%", "+12%", "+18%", "+24%", "+30%"]
    for lang, voice in VOICES.items():
        print(f"\n--- Video VO Scenes [{lang.upper()}] ({voice}) ---")
        for s_idx, (max_dur, txt) in enumerate(VIDEO_SCENES[lang], start=1):
            out_p = os.path.join(VIDEO_DIR, f"vo_{lang}_s{s_idx}.mp3")
            chosen_dur = 99.0
            chosen_rate = ""
            for r in rates_to_try:
                await gen_one(voice, txt, out_p, rate=r)
                d = get_duration(out_p)
                chosen_dur = d
                chosen_rate = r
                if d <= max_dur:
                    break
            status = "OK" if chosen_dur <= max_dur else "OVER!"
            print(f"  Scene {s_idx}: {chosen_dur:.2f}s / max {max_dur:.2f}s (rate {chosen_rate}) [{status}]")

if __name__ == "__main__":
    asyncio.run(main())
