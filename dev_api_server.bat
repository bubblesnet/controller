SET NODE_ENV=development
SET DEBUG=api-server,edgemeasurement_routes
SET LOG_LEVEL=silly
SET API_HOST=localhost
cd server
node src/api-server.js
