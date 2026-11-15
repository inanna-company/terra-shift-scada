@echo off
chcp 65001 >nul
title INANNA COMPANY - TERRA-SHIFT SCADA (Servidor Local NASA Space Apps 2026)
color 0B
cd /d "%~dp0"

echo ============================================================================
echo   TERRA-SHIFT SCADA ^& IIoT — EQUIPO INANNA (Río Cuarto -^> Calamuchita)
echo   2026 NASA Space Apps Challenge ("Field Shift: Adapting Farms with NASA Data")
echo ============================================================================
echo.
echo   Abriendo consola principal en http://localhost:8765/ ...
echo   - Consola Principal:   http://localhost:8765/index.html
echo   - Emulador ESP32 Vivo: http://localhost:8765/esp32/index.html
echo   - Video Oficial 29s:   http://localhost:8765/video/index.html
echo   - Presentacion 7 Diap: http://localhost:8765/presentation/deck_7_slides.html
echo   - 4 Manuales Tecnicos: http://localhost:8765/manuals/index.html
echo.
echo   (Deja esta ventana abierta mientras uses la plataforma localmente)
echo ============================================================================
echo.

start "" "http://localhost:8765/index.html"
python -m http.server 8765
pause
