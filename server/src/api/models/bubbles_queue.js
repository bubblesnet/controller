'use strict';
const Stomp = require('stomp-client');

//var __stompClient = null;
var the_message_producer = null;

const MessageProducer = function MessageProducer() {
    this._stompClient = null;
    the_message_producer = this;
};

MessageProducer.prototype.init = async function init(){
    return new Promise((resolve,reject) => {
        console.log("promise");
        this._stompClient = new Stomp('127.0.0.1', 61613, 'user', 'password');
//        __stompClient = this._stompClient;
        console.log("connecting");
        this._stompClient.connect(function (sessionId) {
            console.log("STOMP client connected with sessionId "+sessionId);
            resolve();
        }, function (err) {
            console.log("STOMP client connect failed " + JSON.stringify(err))
            reject("connect failed");
        });
});};

MessageProducer.prototype.sendMessage = function sendMessage(messageToPublish){
    console.log("sendMessage");
    this._stompClient.publish('/queue/bubbles', messageToPublish);
    console.log("sendMessage returns ");
};

MessageProducer.prototype.subscribe = function subscribe(){
    console.log("subscribe");
    this._stompClient.subscribe('/queue/bubbles', MessageProducer.prototype.receiveMessage);
    console.log("subscribe returns ");
};

MessageProducer.prototype.receiveMessage = function receiveMessage(body,header){
    console.log("receiveMessage body = "+JSON.stringify(body));
    console.log( "header = " +  JSON.stringify(header));
    the_message_producer._stompClient.ack(header['message-id'])
};

module.exports = new MessageProducer();