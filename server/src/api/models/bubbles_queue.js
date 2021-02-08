'use strict';
const Stomp = require('stompit');
let state = require('../../initial_state.json');


const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders': {
        'host': '/',
        'login': 'user',
        'passcode': 'password',
//        'heart-beat': '5000,5000' LEAVE THIS TURNED OFF BECAUSE ACTIVEMQ TIMES OUT OTHERWISE
    }
};

const MessageProducer = function MessageProducer() {
};

let clientSet = false


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

MessageProducer.prototype.init = async function init(cb) {
    console.log("bubbles_queue.init")
    return new Promise(async (resolve, reject) => {
        let count = 1
        clientSet = false;
        while (clientSet === false && count <= 20) {
            console.log("initing .... " + count)

            await Stomp.connect(connectOptions, function (error, client) {
                if (!error) {
                    console.log("STOMP client connected on try #" + count);
                    clientSet = true;
                    cb(client)
                    resolve();
                } else {
                    console.log("STOMP client connect failed " + JSON.stringify(error))
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

    });
};

MessageProducer.prototype.subscribeToTopic = function subscribeToTopic(__stompClient, cb) {
    console.log("MessageProducer.prototype.subscribeToTopic")
    const subscribeHeaders = {
        'destination': '/topic/bubbles_ui',
        'ack': 'auto'
    };
    __stompClient.subscribe(subscribeHeaders, (error, message) => {
        console.log('received a message '+message);
        message.readString('utf-8', function (error, body) {
            if (error) {
                return;
            }
            console.log('read a message '+body);
            cb(body)
//            __stompClient.ack(message);
//            __stompClient.disconnect();
        })
    })
}

MessageProducer.prototype.sendMessageToTopic = function sendMessageToTopic(__stompClient, messageToPublish) {
    console.log("sendMessage "+messageToPublish);
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    const frame = __stompClient.send(sendHeaders);
    frame.write(messageToPublish);
    frame.end();

    console.log("sendMessageToTopic returns ");
};

MessageProducer.prototype.sendMessageToQueue = function sendMessageToQueue(__stompClient, messageToPublish) {
    console.log("sendMessage "+messageToPublish);
    const sendHeaders = {
        'destination': '/queue/bubbles',
        'content-type': 'text/plain'
    };

    const frame = __stompClient.send(sendHeaders);
    frame.write(messageToPublish);
    frame.end();

    console.log("sendMessage returns ");
};

MessageProducer.prototype.subscribeToQueue = function subscribeToQueue(__stompClient, cb) {
    console.log("subscribe");
    const subscribeHeaders = {
        'destination': '/queue/bubbles',
        'ack': 'auto'
    };
    __stompClient.subscribe(subscribeHeaders, function (error, message) {
        console.log("subscribe read message callback")
        if (error) {
//            console.log('subscribe error ' + error.message);
            return;
        }
        console.log("reading")

        message.readString('utf-8', function (error, body) {
                console.log("reading callback")
                if (error) {
//                    console.log('read message error ' + error.message);
                    return;
                }
                console.log('received message: ' + body);
                cb(body);
//            __stompClient.ack(message);
            }
        );
    });
}

MessageProducer.prototype.deInit = function deInit(_stompClient) {
    _stompClient.disconnect();
    _stompClient = null;
}

module.exports = new MessageProducer();