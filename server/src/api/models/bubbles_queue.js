'use strict';
const Stomp = require('stompit');

var __stompClient = null;

const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders':{
        'host': '/',
        'login': 'user',
        'passcode': 'password',
        'heart-beat': '5000,5000'
    }
};

const MessageProducer = function MessageProducer() {
};

MessageProducer.prototype.init = function init(){
    return new Promise((resolve,reject) => {
        console.log("promise");
        Stomp.connect(connectOptions, function(error, client) {
            console.log("STOMP client connected with sessionId ");
            if( !error ) {
                __stompClient = client
                resolve();
            } else {
                console.log("STOMP client connect failed " + JSON.stringify(err))
                reject();
            }
        });
});};

MessageProducer.prototype.sendMessage = function sendMessage(messageToPublish){
    console.log("sendMessage");
    const sendHeaders = {
        'destination': '/queue/bubbles',
        'content-type': 'text/plain'
    };

    const frame = __stompClient.send(sendHeaders);
    frame.write('hello');
    frame.end();

    console.log("sendMessage returns ");
};

MessageProducer.prototype.subscribeToQueue = function subscribe() {
    console.log("subscribe");
    const subscribeHeaders = {
        'destination': '/queue/bubbles',
        'ack': 'auto'
    };

    __stompClient.subscribe(subscribeHeaders, function (error, message) {
        console.log("subscribe read message callback")
        if (error) {
            console.log('subscribe error ' + error.message);
            return;
        }
        console.log("reading")

        message.readString('utf-8', function (error, body) {
            console.log("reading callback")
            if (error) {
                console.log('read message error ' + error.message);
                return;
            }
            console.log('received message: ' + body);
            _stompClient.ack(message);
        }
    );
    });
}

MessageProducer.prototype.deInit = function deInit(){
    this._stompClient.disconnect();
    this._stompClient = null;
}

module.exports = new MessageProducer();