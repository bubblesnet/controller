xcopy ..\server\src api\server\src /I /S /Y
del api\server\*.json
copy ..\server\package.json api\server /Y
copy ..\server\package-lock.json api\server /Y
copy ..\server\config_prod.json api\server\config.json /Y
copy ..\server\config_prod.json api\server\config_prod.json /Y
copy ..\server\config_pi.json api\server\config_pi.json /Y
copy ..\server\config_ci.json api\server\config_ci.json /Y
copy ..\server\config_test.json api\server\config_test.json /Y
copy ..\server\config_dev.json api\server\config_dev.json /Y

xcopy ..\server\migrations database\migrations /I /S /Y

xcopy ..\server\src queue\server\src /I /S /Y
copy ..\server\package.json queue\server /Y
copy ..\server\package-lock.json queue\server /Y

xcopy ..\client\build ui\client\build /I /S /Y
copy ..\client\package.json ui\client /Y
copy ..\client\package-lock.json ui\client /Y

xcopy ..\server\src websocket\server\src /I /S /Y
copy ..\server\package.json websocket\server /Y
copy ..\server\package-lock.json websocket\server /Y

balena push bubblesnet4_controller_prod

