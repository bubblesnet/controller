'use strict';
const Stomp = require('stomp-client');



const MessageProducer = function MessageProducer() {
    this._stompClient = null;
    this.connected = false;
};
MessageProducer.prototype.init = async function init(){
    return new Promise((resolve,reject) => {
        console.log("promise");
        this._stompClient = new Stomp('127.0.0.1', 61613, 'user', 'password');
        console.log("connecting");
        this._stompClient.connect(function (sessionId) {
            this.connected = true;
            console.log("STOMP client connected with sessionId "+sessionId);
            resolve();
        }, function (err) {
            console.log("STOMP client connect failed " + JSON.stringify(err))
            this.connected = false;
            reject("connect failed");
        });
});};

MessageProducer.prototype.sendMessage = function sendMessage(messageToPublish){
    console.log("sendMessage");
    let ret = this._stompClient.publish('/queue/bubbles', messageToPublish);
    console.log("sendMessage returns " + ret.connected);
};

MessageProducer.prototype.subscribe = function subscribe(){
    console.log("subscribe");
    let ret = this._stompClient.subscribe('/queue/bubbles', receiveMessage);
    console.log("subscribe returns " + ret.connected);
};

function receiveMessage(body,header){
    console.log("receiveMessage body = "+JSON.stringify(body), JSON.stringify(header));
};

module.exports = new MessageProducer();