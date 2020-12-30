export PORT=3002
export ICEBREAKER_DB=icebreaker_test
export NODE_ENV=TEST
cd server || exit
node src/app.js
