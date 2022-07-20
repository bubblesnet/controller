COPY ui\.env.production ..\client\.env
cd ..\client
call npm run --silent build
cd ..\pi

xcopy /q ..\server\src api\server\src /I /S /Y
del api\server\*.json
copy ..\server\package.json api\server /Y
copy ..\server\package-lock.json api\server /Y
copy ..\server\config_prod.json api\server\config.json /Y
copy ..\server\config_prod.json api\server\config_prod.json /Y
copy ..\server\config_pi.json api\server\config_pi.json /Y
copy ..\server\config_ci.json api\server\config_ci.json /Y
copy ..\server\config_test.json api\server\config_test.json /Y
copy ..\server\config_dev.json api\server\config_dev.json /Y

xcopy /q ..\server\migrations api\migrations /I /S /Y

xcopy /q ..\server\src queue\server\src /I /S /Y
copy ..\server\package.json queue\server /Y
copy ..\server\package-lock.json queue\server /Y

xcopy /q ..\client\build ui\build /I /S /Y
copy ..\client\package.json ui\client /Y
copy ..\client\package-lock.json ui\client /Y

xcopy /q ..\server\src websocket\server\src /I /S /Y
copy ..\server\package.json websocket\server /Y
copy ..\server\package-lock.json websocket\server /Y

balena push bubblesnet_coral

