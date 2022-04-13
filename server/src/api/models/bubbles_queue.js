// copyright and license inspection - no issues 4/13/22

'use strict';
const Stomp = require('stompit');
let state = require('../../initial_state.json');
const debug = require('debug')('bubbles_queue')

let util = require("../../util")

let ports = util.get_server_ports_for_environment(process.env.NODE_ENV)
const connectOptions = {
    'host': ports.activemq_server_host,
    'port': ports.activemq_server_port,
    'connectHeaders': {
        'host': '/',
        'login': 'user',
        'passcode': 'password',
//        'heart-beat': '5000,5000' // LEAVE THIS TURNED OFF BECAUSE ACTIVEMQ TIMES OUT OTHERWISE
    }
};
/*  This is the error that turning on heart-beat causes ...
Error: connection timed out
    at Client._createError (C:\Users\rodley\Documents\go\src\bubblesnet\controller\server\node_modules\←[4mstompit←[24m\lib\Socket.js:240:15)
    at Client.createTransportError (C:\Users\rodley\Documents\go\src\bubblesnet\controller\server\node_modules\←[4mstompit←[24m\lib\Socket.js:256:24)
    at Timeout._onTimeout (C:\Users\rodley\Documents\go\src\bubblesnet\controller\server\node_modules\←[4mstompit←[24m\lib\Socket.js:228:29)
←[90m    at listOnTimeout (internal/timers.js:549:17)←[39m
←[90m    at processTimers (internal/timers.js:492:7)←[39m
Emitted 'error' event on Client instance at:
    at Client.destroy (C:\Users\rodley\Documents\go\src\bubblesnet\controller\server\node_modules\←[4mstompit←[24m\lib\Socket.js:126:14)
    at Timeout._onTimeout (C:\Users\rodley\Documents\go\src\bubblesnet\controller\server\node_modules\←[4mstompit←[24m\lib\Socket.js:228:16)
←[90m    at listOnTimeout (internal/timers.js:549:17)←[39m
←[90m    at processTimers (internal/timers.js:492:7)←[39m {
  isTransportError: ←[36m[Function: isTransportError]←[39m,
  isProtocolError: ←[36m[Function: isProtocolError]←[39m,
  isApplicationError: ←[36m[Function: isApplicationError]←[39m
}

 */

const MessageProducer = function MessageProducer() {
};

let clientSet = false


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

MessageProducer.prototype.init = async function init(cb) {
    debug("bubbles_queue.init")
    return new Promise(async (resolve, reject) => {
        let count = 1
        clientSet = false;
        while (clientSet === false && count <= 20) {
            debug("initing .... " + count)

            await Stomp.connect(connectOptions, function (error, client) {
                if (!error) {
                    debug("STOMP client connected on try #" + count);
                    clientSet = true;
                    cb(client)
                    resolve();
                } else {
                    debug("STOMP client connect failed " + JSON.stringify(error))
                    if( count === 20 ) {
                        reject("STOMP client connect failed - too many retries " + JSON.stringify(error));
                    }
                }
            });
            if (!clientSet) {
                count++;
                await sleep(2000)
            }
        }
        resolve();
    });
};

MessageProducer.prototype.subscribeToTopic = function subscribeToTopic(__stompClient, cb) {
    debug("MessageProducer.prototype.subscribeToTopic")
    const subscribeHeaders = {
        'destination': '/topic/bubbles_ui',
        'ack': 'auto'
    };
    __stompClient.subscribe(subscribeHeaders, (error, message) => {
//        debug('received a message on topic '+subscribeHeaders.destination+' '+JSON.stringify(message));
        message.readString('utf-8', function (error, body) {
            if (error) {
                return;
            }
            debug('read a message '+body);
            cb(body, function() {
                debug("topic callback?");
            })
//            __stompClient.ack(message);
//            __stompClient.disconnect();
        })
    })
}

/*
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

 */
MessageProducer.prototype.sendMessageToTopic = function sendMessageToTopic(__stompClient, sendHeaders, messageToPublish) {
    debug("sendMessage "+messageToPublish);

    const frame = __stompClient.send(sendHeaders);
    frame.write(messageToPublish);
    frame.end();

    debug("sendMessageToTopic returns ");
};

MessageProducer.prototype.sendMessageToQueue = function sendMessageToQueue(__stompClient, messageToPublish) {
    debug("sendMessage "+messageToPublish);
    const sendHeaders = {
        'destination': '/queue/bubbles',
        'content-type': 'text/plain'
    };

    const frame = __stompClient.send(sendHeaders);
    frame.write(messageToPublish);
    frame.end();

    debug("sendMessage returns ");
};

MessageProducer.prototype.subscribeToQueue = function subscribeToQueue(__stompClient, cb) {
    debug("subscribe");
    const subscribeHeaders = {
        'destination': '/queue/bubbles',
        'ack': 'auto'
    };
    __stompClient.subscribe(subscribeHeaders, function (error, message) {
        debug("subscribe read message callback")
        if (error) {
//            debug('subscribe error ' + error.message);
            return;
        }
        debug("reading")

        message.readString('utf-8', function (error, body) {
                debug("reading callback")
                if (error) {
//                    debug('read message error ' + error.message);
                    return;
                }
                debug('received message: ' + body);
                cb(body);
//            __stompClient.ack(message);
            }
        );
    });
}

MessageProducer.prototype.deInit = function deInit(__stompClient) {
    if( typeof __stompClient !== 'undefined' ) {
        __stompClient.disconnect();
        __stompClient = null;
    } else {
        console.error("Tried to disconnect from disconnected client")
    }
}

module.exports = new MessageProducer();