global.__root   = __dirname + '/';

const bubbles_queue = require('./api/models/bubbles_queue')
const debug = require('debug')('ws-server')

const ws = require("nodejs-websocket")
let connection
let z

let __queueClient

const SWITCH_COMMAND="switch"
const PICTURE_COMMAND="picture"

function setClient(client) {
    debug("setclient " + client)
    __queueClient = client;
}

async function subscribeToTopic() {
    debug("subscribe to activemq ui topic")
    await bubbles_queue.init(setClient).then( value => {
        debug("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToTopic(__queueClient, function (body) {
            if( typeof(connection) === 'undefined' ) {
                debug("no UI clients. yet")
            } else if (connection === null ) {
                debug("had a UI client but he closed out and nulled")
            }
            else if( connection.readyState !== connection.OPEN) {
                debug("had a UI client but he closed out (crashed?)")
            } else {
//                debug("UI client is initialized and OPEN, forwarding msg " + body)
                connection.sendText(body)
            }
        });
    }, reason => {
        debug("bubbles_queue.init failed "+reason)
    });
}

function ui_service_callback(body) {
    if (typeof (connection) === 'undefined') {
        debug("no UI clients. yet")
    } else if (connection === null) {
        debug("had a UI client but he closed out and nulled")
    } else if (connection.readyState !== connection.OPEN) {
        debug("had a UI client but he closed out (crashed?)")
    } else {
        debug("UI client is initialized and OPEN, echoing msg " + body)
        connection.sendText(body)
    }
}

function runWebSocketServer(port) {
    debug("Websocket server listening on "+port)
    z = ws.createServer(function (conn) {
        connection = conn
        conn.on("connect", function () {
            debug("New connection")
            connection = conn
        })
        conn.on("error", function (err) {
            if( (""+err).includes("ECONNRESET")) {
                debug("client window closed")
            } else {
                console.error("error " + err)
            }
        })
        conn.on("text", function (str) {
            let x = JSON.parse(str)
            if (x.command === SWITCH_COMMAND || x.command === PICTURE_COMMAND) {
                debug("Received command " + str)
                let devices = ['70000007','70000008']
                for( let i = 0; i < devices.length; i++ ) {
                    const sendHeaders = {
                        'destination': '/topic/00999999/'+devices[i],
                        'content-type': 'text/json'
                    };
                    bubbles_queue.sendMessageToTopic(__queueClient, sendHeaders, str)
                }
            } else {
                debug("NOT Echoing received state")
            }
        })
        conn.on("close", function (code, reason) {
            debug("Connection closed "+code+ " reason " + reason)
            connection = null;
        })
        conn.on("complete", function() {
            debug("ONCOMPLETE!!!!")
        })
    })
    return( z )
}

const serveUIWebSockets = async(port) => {
    debug("serveUIWebSockets")
    await subscribeToTopic()
    z = runWebSocketServer(port)
    const server = z.listen(port)
}

function close() {
    bubbles_queue.deInit(__queueClient)
    if( typeof z !== 'undefined') {
        debug("Closing web socket server")
        z.close();
    } else {
        console.error("Tried to close undefined web socket server")
    }

}

module.exports = {
    ui_service_callback,
    runWebSocketServer,
    subscribeToTopic,
    serveUIWebSockets,
    close
}
