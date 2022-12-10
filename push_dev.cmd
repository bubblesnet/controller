COPY ui\.env.production client\.env
cd client
call npm run --silent build
cd ..

xcopy /q server\src pi\api\server\src /I /S /Y
del api\server\*.json
copy server\package.json pi\api\server /Y
copy server\package-lock.json pi\api\server /Y
copy server\config_prod.json pi\api\server\config.json /Y
copy server\config_prod.json pi\api\server\config_prod.json /Y
copy server\config_pi.json pi\api\server\config_pi.json /Y
copy server\config_ci.json pi\api\server\config_ci.json /Y
copy server\config_test.json pi\api\server\config_test.json /Y
copy server\config_dev.json pi\api\server\config_dev.json /Y

xcopy /q server\migrations pi\api\migrations /I /S /Y

xcopy /q server\src pi\queue\server\src /I /S /Y
copy server\package.json pi\queue\server /Y
copy server\package-lock.json pi\queue\server /Y

xcopy /q client\build pi\ui\build /I /S /Y
copy client\package.json pi\ui\client /Y
copy client\package-lock.json pi\ui\client /Y

xcopy /q server\src pi\websocket\server\src /I /S /Y
copy server\package.json pi\websocket\server /Y
copy server\package-lock.json pi\websocket\server /Y

balena push bubblesnet4_controller_dev

