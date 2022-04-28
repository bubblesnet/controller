xcopy ..\server\src api\server\src /I /S /Y
copy ..\server\package.json api\server /Y
copy ..\server\package-lock.json api\server /Y
copy ..\server\config_dev.json api\server\config.json /Y

xcopy ..\server\migrations database\migrations /I /S /Y

xcopy ..\server\src queue\server\src /I /S /Y
copy ..\server\package.json queue\server /Y
copy ..\server\package-lock.json queue\server /Y

xcopy ..\client\build ui\client\build /I /S /Y

xcopy ..\server\src websocket\server\src /I /S /Y
copy ..\server\package.json websocket\server /Y
copy ..\server\package-lock.json websocket\server /Y

balena push bubblesnet4_controller_dev

