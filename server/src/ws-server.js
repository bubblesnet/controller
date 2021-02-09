global.__root   = __dirname + '/';

const wsu = require('./ws-server-utils')

// noinspection JSIgnoredPromiseFromCall
x = wsu.serveUIWebSockets(8001);
