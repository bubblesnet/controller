global.__root   = __dirname + '/';


const wsu = require('./ws-server-utils')
const util = require('./util')
const asu = require('./alert-server-utils')

ports = util.get_server_ports_for_environment( process.env.NODE_ENV )

// noinspection JSIgnoredPromiseFromCall
x = wsu.serveUIWebSockets(ports.websocket_server_port, asu.alert_service_callback());
