@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
title TEAM INANNA - Estacion Automatica de Flasheo ESP32 | TERRA-SHIFT SCADA (NASA Space Apps 2026)
color 0B

:: ==============================================================================
::  TEAM INANNA (Rio Cuarto -> Sede Santa Rosa de Calamuchita)
::  Estacion Automatica de Flasheo y Compilacion ESP32 - TERRA-SHIFT SCADA
::  Soporta:
::   - Flasheo ULTRA-RAPIDO (4 seg) desde Binarios Precompilados (.merged.bin 0x0)
::   - Recompilacion + Flasheo directo desde Codigo Editable (.ino) con Arduino-CLI
::   - Lectura de MAC para ESP-NOW, Borrado NVS y Monitor Serie Interactivo
:: ==============================================================================

set "ROOT_DIR=%~dp0"
set "BIN_GATEWAY=%ROOT_DIR%firmware\bin\gateway\esp32_gateway_scada_modbus.ino.merged.bin"
set "BIN_NODE=%ROOT_DIR%firmware\bin\node\esp32_field_node_espnow_4_20ma.ino.merged.bin"
set "INO_GATEWAY=%ROOT_DIR%firmware\esp32_gateway_scada_modbus"
set "INO_NODE=%ROOT_DIR%firmware\esp32_field_node_espnow_4_20ma"

:: Autodeteccion de esptool.exe
set "ESPTOOL=C:\Users\maxi\AppData\Local\Programs\Python\Python312\Scripts\esptool.exe"
if not exist "%ESPTOOL%" (
    for /f "delims=" %%E in ('where esptool.exe 2^>nul') do set "ESPTOOL=%%E"
)

:: Autodeteccion de arduino-cli.exe (Arduino IDE 2.x o local)
set "ARDUINO_CLI=C:\Program Files\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe"
if not exist "%ARDUINO_CLI%" (
    if exist "%ROOT_DIR%tools\arduino-cli.exe" set "ARDUINO_CLI=%ROOT_DIR%tools\arduino-cli.exe"
)

:DETECTAR_PUERTO
cls
echo ===============================================================================
echo    TEAM INANNA  ^|  TERRA-SHIFT SCADA  ^|  ESTACION DE FLASHEO ESP32 AUTOMATICA
echo    Lazo 4-20 mA (NAMUR NE43) + Red Rural ESP-NOW + Modbus TCP:502 / RS485
echo ===============================================================================
echo.
echo [1/2] Escaneando puertos serie USB/COM conectados...
echo -------------------------------------------------------------------------------
powershell -NoProfile -Command "Get-CimInstance Win32_SerialPort | Select-Object DeviceID, Description | Format-Table -AutoSize"
echo -------------------------------------------------------------------------------

set "COM_PORT="
for /f "tokens=1" %%A in ('powershell -NoProfile -Command "[System.IO.Ports.SerialPort]::GetPortNames()"') do (
    set "COM_PORT=%%A"
)

if "%COM_PORT%"=="" (
    set "COM_PORT=COM3"
    echo [!] Ningun ESP32 detectado enchufado ahora mismo (Puerto por defecto: COM3).
) else (
    echo [OK] Puerto serie detectado automaticamente: %COM_PORT%
)
echo.
set /p "USER_PORT=Ingresa el puerto COM del ESP32 (ENTER para usar %COM_PORT%): "
if not "%USER_PORT%"=="" set "COM_PORT=%USER_PORT%"

:MENU_PRINCIPAL
cls
echo ===============================================================================
echo    TEAM INANNA  ^|  TERRA-SHIFT SCADA  ^|  ESTACION DE PRODUCCION ESP32
echo    Puerto Activo: [%COM_PORT%]  ^|  Wi-Fi AP Gateway: INANNA-TERRASHIFT-AP
echo ===============================================================================
echo.
echo   --- FLASHEO INSTANTANEO DESDE BINARIO PRECOMPILADO (.BIN LISTO EN 4 SEG) ---
echo   [1] Flashear BINARIO -> ESP32 GATEWAY CENTRAL SCADA (AP 192.168.4.1 + Modbus 502)
echo   [2] Flashear BINARIO -> ESP32 NODO SATELITE DE CAMPO (ESP-NOW + 4-20mA ADS1115)
echo.
echo   --- SI EDITASTE EL CODIGO .INO (RECOMPILAR + ACTUALIZAR .BIN + FLASHEAR) ---
echo   [3] Compilar y Flashear .INO -> esp32_gateway_scada_modbus.ino
echo   [4] Compilar y Flashear .INO -> esp32_field_node_espnow_4_20ma.ino
echo   [5] Solo Recompilar ambos .INO y regenerar archivos .BIN (sin ESP32 enchufado)
echo.
echo   --- UTILIDADES DE CAMPO Y DIAGNOSTICO ---
echo   [6] Leer Direccion MAC de Fabrica del ESP32 (Para enlazar nodos ESP-NOW)
echo   [7] Abrir Monitor Serie Interactivo (115200 baudios - Teclas N / D / C / A)
echo   [8] Borrar Memoria Flash completa y Horometro NVS (Erase Flash)
echo   [9] Cambiar Puerto COM (Actual: %COM_PORT%)
echo   [0] Salir
echo.
echo ===============================================================================
set /p "OPCION=Selecciona una opcion [0-9]: "

if "%OPCION%"=="1" (
    set "TARGET_BIN=%BIN_GATEWAY%"
    set "TARGET_NAME=ESP32 GATEWAY CENTRAL SCADA"
    goto FLASHEAR_MERGED_BIN
)
if "%OPCION%"=="2" (
    set "TARGET_BIN=%BIN_NODE%"
    set "TARGET_NAME=ESP32 NODO SATELITE ESP-NOW + 4-20mA"
    goto FLASHEAR_MERGED_BIN
)
if "%OPCION%"=="3" (
    set "SKETCH_DIR=%INO_GATEWAY%"
    set "OUT_SUB=gateway"
    goto COMPILAR_Y_SUBIR
)
if "%OPCION%"=="4" (
    set "SKETCH_DIR=%INO_NODE%"
    set "OUT_SUB=node"
    goto COMPILAR_Y_SUBIR
)
if "%OPCION%"=="5" goto SOLO_RECOMPILAR
if "%OPCION%"=="6" goto LEER_MAC
if "%OPCION%"=="7" goto MONITOR_SERIE
if "%OPCION%"=="8" goto BORRAR_FLASH
if "%OPCION%"=="9" goto DETECTAR_PUERTO
if "%OPCION%"=="0" exit /b
goto MENU_PRINCIPAL

:FLASHEAR_MERGED_BIN
echo.
if not exist "%TARGET_BIN%" (
    echo [!] No se encontro el binario precompilado: "%TARGET_BIN%"
    echo [*] Generandolo ahora mismo desde el codigo .INO...
    call :FUNC_COMPILAR_AMBOS
)
echo [*] Flasheando %TARGET_NAME% en [%COM_PORT%] a 460800 baudios (Imagen Completa 0x0)...
"%ESPTOOL%" --chip esp32 --port %COM_PORT% --baud 460800 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size 4MB 0x0 "%TARGET_BIN%"
echo.
if %ERRORLEVEL% EQU 0 (
    echo [EXITO] ¡ESP32 flasheado y arrancando! Puedes abrir [7] Monitor Serie para verlo en vivo.
) else (
    echo [ERROR] Revisa que el cable USB sea de datos, el puerto [%COM_PORT%] sea correcto, o manten presionado BOOT al iniciar.
)
echo.
pause
goto MENU_PRINCIPAL

:COMPILAR_Y_SUBIR
echo.
call :ASEGURAR_ACLI
echo [*] Compilando codigo .INO editable y actualizando binario en firmware\bin\%OUT_SUB%...
"%ARDUINO_CLI%" compile --fqbn esp32:esp32:esp32 --output-dir "%ROOT_DIR%firmware\bin\%OUT_SUB%" "%SKETCH_DIR%" --upload -p %COM_PORT%
echo.
pause
goto MENU_PRINCIPAL

:SOLO_RECOMPILAR
echo.
call :FUNC_COMPILAR_AMBOS
echo.
pause
goto MENU_PRINCIPAL

:FUNC_COMPILAR_AMBOS
call :ASEGURAR_ACLI
echo [*] [1/2] Compilando esp32_field_node_espnow_4_20ma.ino...
"%ARDUINO_CLI%" compile --fqbn esp32:esp32:esp32 --output-dir "%ROOT_DIR%firmware\bin\node" "%INO_NODE%"
echo [*] [2/2] Compilando esp32_gateway_scada_modbus.ino...
"%ARDUINO_CLI%" compile --fqbn esp32:esp32:esp32 --output-dir "%ROOT_DIR%firmware\bin\gateway" "%INO_GATEWAY%"
echo [OK] Binarios (.bin y .merged.bin) actualizados en firmware\bin\
exit /b

:ASEGURAR_ACLI
if not exist "%ARDUINO_CLI%" (
    echo [*] Descargando Arduino-CLI portable en tools\...
    if not exist "%ROOT_DIR%tools" mkdir "%ROOT_DIR%tools"
    powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://downloads.arduino.cc/arduino-cli/arduino-cli_latest_Windows_64bit.zip' -OutFile '%ROOT_DIR%tools\acli.zip'; Expand-Archive -Path '%ROOT_DIR%tools\acli.zip' -DestinationPath '%ROOT_DIR%tools' -Force"
    set "ARDUINO_CLI=%ROOT_DIR%tools\arduino-cli.exe"
    "%ARDUINO_CLI%" config init >nul 2>&1
    "%ARDUINO_CLI%" core update-index --additional-urls https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
    "%ARDUINO_CLI%" core install esp32:esp32 --additional-urls https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
)
exit /b

:LEER_MAC
echo.
echo [*] Leyendo Direccion MAC de fabrica del ESP32 en [%COM_PORT%]...
"%ESPTOOL%" --port %COM_PORT% chip_id
echo.
echo (Pega esta MAC en GATEWAY_MAC[6] dentro de esp32_field_node_espnow_4_20ma.ino si deseas enlace unicast cifrado)
pause
goto MENU_PRINCIPAL

:BORRAR_FLASH
echo.
echo [!] Borrando memoria Flash completa y horometro NVS del ESP32 en [%COM_PORT%]...
"%ESPTOOL%" --chip esp32 --port %COM_PORT% erase_flash
echo.
pause
goto MENU_PRINCIPAL

:MONITOR_SERIE
echo.
echo ===============================================================================
echo  MONITOR SERIE INTERACTIVO EN [%COM_PORT%] @ 115200 BAUDIOS
echo  Comandos en vivo: [N]=Nominal 11.68mA | [D]=Raiz Seca 6.8mA | [C]=Cortar Cable | [A]=ACK
echo  Presiona [Q] o [Ctrl+C] para volver al menu.
echo ===============================================================================
powershell -NoProfile -Command "$port = New-Object System.IO.Ports.SerialPort '%COM_PORT%', 115200, 'None', 8, 'One'; $port.Open(); try { while ($true) { if ($port.BytesToRead -gt 0) { Write-Host -NoNewline $port.ReadExisting() }; if ([Console]::KeyAvailable) { $k = [Console]::ReadKey($true); if ($k.KeyChar -eq 'q' -or $k.KeyChar -eq 'Q') { break }; $port.Write($k.KeyChar.ToString()) }; Start-Sleep -Milliseconds 25 } } finally { $port.Close() }"
echo.
pause
goto MENU_PRINCIPAL
