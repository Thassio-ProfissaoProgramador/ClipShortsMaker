@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>&1
if not errorlevel 1 goto use_py
where python >nul 2>&1
if not errorlevel 1 goto use_python

echo Python 3 nao foi encontrado neste computador.
echo Instale Python 3 ou inicie um servidor local com outra ferramenta.
pause
exit /b 1

:use_py
start "" /b cmd /c "ping 127.0.0.1 -n 3 >nul ^& start http://localhost:5500"
py -m http.server 5500
goto finished

:use_python
start "" /b cmd /c "ping 127.0.0.1 -n 3 >nul ^& start http://localhost:5500"
python -m http.server 5500

:finished
echo.
echo Servidor encerrado.
pause
