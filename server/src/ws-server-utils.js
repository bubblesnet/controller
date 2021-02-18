global.__root   = __dirname + '/';

const bubbles_queue = require('./api/models/bubbles_queue')

const ws = require("nodejs-websocket")
let connection
let z

let __queueClient

const SWITCH_COMMAND="switch"

function setClient(client) {
    console.log("setclient " + client)
    __queueClient = client;
}

async function subscribeToTopic() {
    console.log("subscribe to activemq ui topic")
    await bubbles_queue.init(setClient).then( value => {
        console.log("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToTopic(__queueClient, function (body) {
            if( typeof(connection) === 'undefined' ) {
                console.log("no UI clients. yet")
            } else if (connection === null ) {
                console.log("had a UI client but he closed out and nulled")
            }
            else if( connection.readyState !== connection.OPEN) {
                console.log("had a UI client but he closed out (crashed?)")
            } else {
//                console.log("UI client is initialized and OPEN, forwarding msg " + body)
                connection.sendText(body)
            }
        });
    }, reason => {
        console.log("bubbles_queue.init failed "+reason)
    });
}

function ui_service_callback(body) {
    if (typeof (connection) === 'undefined') {
        console.log("no UI clients. yet")
    } else if (connection === null) {
        console.log("had a UI client but he closed out and nulled")
    } else if (connection.readyState !== connection.OPEN) {
        console.log("had a UI client but he closed out (crashed?)")
    } else {
        console.log("UI client is initialized and OPEN, echoing msg " + body)
        connection.sendText(body)
    }
}

function runWebSocketServer(port) {
    console.log("Websocket server listening on "+port)
    z = ws.createServer(function (conn) {
        connection = conn
        conn.on("connect", function () {
            console.log("New connection")
            connection = conn
        })
        conn.on("error", function (err) {
            if( (""+err).includes("ECONNRESET")) {
                console.log("client window closed")
            } else {
                console.error("error " + err)
            }
        })
        conn.on("text", function (str) {
            let x = JSON.parse(str)
            if (x.command === SWITCH_COMMAND) {
                console.log("Received switch command " + str)
                const sendHeaders = {
                    'destination': '/topic/00999999/70000007',
                    'content-type': 'text/json'
                };
                bubbles_queue.sendMessageToTopic(__queueClient,sendHeaders,str)
            } else {
                console.log("NOT Echoing received state")
            }
        })
        conn.on("close", function (code, reason) {
            console.log("Connection closed "+code+ " reason " + reason)
            connection = null;
        })
        conn.on("complete", function() {
            console.log("ONCOMPLETE!!!!")
        })
    })
    return( z )
}

const serveUIWebSockets = async(port) => {
    console.log("serveUIWebSockets")
    await subscribeToTopic()
    z = runWebSocketServer(port)
    const server = z.listen(port)
}

function close() {
    bubbles_queue.deInit(__queueClient)
    if( typeof z !== 'undefined') {
        console.log("Closing web socket server")
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
