
SET POSTGRESQL_APPLICATION_DBNAME=icebreaker_dev
SET NODE_ENV=development
cd server
node src/queue-feeder-emulator.js
