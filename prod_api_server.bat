SET ACTIVEMQ_HOST=192.168.23.237
SET NODE_ENV=production
SET POSTGRES_SYSTEM_DBNAME=postgres
SET POSTGRESQL_APPLICATION_DBNAME=bubbles
SET POSTGRESQL_HOST=192.168.23.237
SET POSTGRESQL_POSTGRES_PASSWORD=postgres
SET POSTGRESQL_POSTGRES_USER=postgres
SET POSTGRESQL_SHARED_DIRECTORY=/Users/john/Documents/go/src/bubblesnet/controller
SET REACT_APP_API_HOST=192.168.23.237
SET REACT_APP_NODE_ENV=production
SET POSTGRESQL_UNIX_USER=postgres
SET DEBUG=*
SET REACT_APP_UI_PORT=3004
SET LOG_LEVEL=silly

cd server
node src/api-server.js
cd ..