SET ICEBREAKER_DB=icebreaker_dev
SET NODE_ENV=DEV
SET DEBUG=api-server,edgemeasurement_routes
SET LOG_LEVEL=silly
cd server
node src/api-server.js
