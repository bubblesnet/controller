SET NODE_ENV=development
SET DEBUG=ws-server,bubbles_queue
SET LOG_LEVEL=silly
cd server
node src/ws-server.js
