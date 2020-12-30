export PORT=3001
export ICEBREAKER_DB=icebreaker_prod
export NODE_ENV=PRODUCTION
cd server || exit
node src/app.js
