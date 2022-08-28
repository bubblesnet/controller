/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const log = require("./bubbles_logger").log

global.__root   = __dirname + '/';

const bubbles_queue = require('./api/models/bubbles_queue')
// const debug = require('debug')('ws-server')

const ws = require("nodejs-websocket")
let connection
let z

let __queueClient

const STAGE_COMMAND="stage"
const STATUS_COMMAND="status"
const SWITCH_COMMAND="switch"
const PICTURE_COMMAND="picture"
const DISPENSE_COMMAND="dispense"

function setClient(client) {
    log.debug("setclient " + client)
    __queueClient = client;
}

async function subscribeToTopic() {
    log.debug("subscribe to activemq ui topic")
    await bubbles_queue.init(setClient).then( value => {
        log.debug("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToTopic(__queueClient, function (body) {
            if( typeof(connection) === 'undefined' ) {
                log.debug("no UI clients. yet")
            } else if (connection === null ) {
                log.debug("had a UI client but he closed out and nulled")
            }
            else if( connection.readyState !== connection.OPEN) {
                log.debug("had a UI client but he closed out (crashed?)")
            } else {
//                log.debug("UI client is initialized and OPEN, forwarding msg " + body)
                connection.sendText(body)
            }
        });
    }, reason => {
        log.debug("bubbles_queue.init failed "+reason)
    });
}

function ui_service_callback(body) {
    if (typeof (connection) === 'undefined') {
        log.debug("no UI clients. yet")
    } else if (connection === null) {
        log.debug("had a UI client but he closed out and nulled")
    } else if (connection.readyState !== connection.OPEN) {
        log.debug("had a UI client but he closed out (crashed?)")
    } else {
        log.debug("UI client is initialized and OPEN, echoing msg " + body)
        connection.sendText(body)
    }
}

function runWebSocketServer(port) {
    log.debug("Websocket server listening on "+port)
    z = ws.createServer(function (conn) {
        connection = conn
        conn.on("connect", function () {
            log.debug("New connection")
            connection = conn
        })
        conn.on("error", function (err) {
            if( (""+err).includes("ECONNRESET")) {
                log.debug("client window closed")
            } else {
                log.error("error " + err)
            }
        })
        conn.on("text", function (str) {
            let x = JSON.parse(str)
            if (x.command === SWITCH_COMMAND || x.command === PICTURE_COMMAND || x.command === STATUS_COMMAND || x.command === STAGE_COMMAND  || x.command === DISPENSE_COMMAND) {
                log.info("Received command " + str)
                let sendHeaders = {
                    'destination': '/topic/'+x.userid+'/'+x.deviceid,
                    'content-type': 'text/json'
                };
                bubbles_queue.sendMessageToTopic(__queueClient, sendHeaders, str)
            } else {
                log.error("NOT sending unknown message "+str)
            }
        })
        conn.on("close", function (code, reason) {
            log.debug("Connection closed "+code+ " reason " + reason)
            connection = null;
        })
        conn.on("complete", function() {
            log.debug("ONCOMPLETE!!!!")
        })
    })
    return( z )
}

const serveUIWebSockets = async(port) => {
    log.debug("serveUIWebSockets")
    await subscribeToTopic()
    z = runWebSocketServer(port)
    const server = z.listen(port)
}

function close() {
    bubbles_queue.deInit(__queueClient)
    if( typeof z !== 'undefined') {
        log.debug("Closing web socket server")
        z.close();
    } else {
        log.error("Tried to close undefined web socket server")
    }

}

module.exports = {
    ui_service_callback,
    runWebSocketServer,
    subscribeToTopic,
    serveUIWebSockets,
    close
}
