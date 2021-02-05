global.__root   = __dirname + '/';

var bubbles_queue = require('./api/models/bubbles_queue')
// var feeder = require('./topic-feeder-emulator');
var ws = require("nodejs-websocket")
var connection
var __queueClient

const SWITCH_COMMAND="switch"

function setClient(client) {
    __queueClient = client;
}

const serveUIWebSockets = async() => {
    console.log("emulateStatusChanges")
    console.log("subscribe to activemq ui topic")
    bubbles_queue.init(setClient).then( value => {
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
                console.log("UI client is initialized and OPEN, sending msg " + body)
                connection.sendText(body)
            }
        });
    }, reason => {
        console.log("bubbles_queue.init failed "+reason)
    });

    console.log("Websocket server listening on 8001")
    const server = ws.createServer(function (conn) {
        connection = conn
        conn.on("connect", function () {
            console.log("New connection")
            connection = conn
        })
        conn.on("error", function (err) {
            if( (""+err).includes("ECONNRESET")) {
                console.log("client window closed")
            } else {
                console.log("error " + err)
            }
        })
        conn.on("text", function (str) {
            let x = JSON.parse(str)
            if (x.command === SWITCH_COMMAND) {
                console.log("Received switch command " + str)
            } else {
                console.log("Echoing received state " + JSON.stringify(x))
                conn.sendText(JSON.stringify(x))
            }
        })
        conn.on("close", function (code, reason) {
            console.log("Connection closed "+code+ " reason " + reason)
            connection = null;
        })
    }).listen(8001)
}

// noinspection JSIgnoredPromiseFromCall
serveUIWebSockets();
