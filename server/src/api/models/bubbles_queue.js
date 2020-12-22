'use strict';
var Stomp = require('stomp-client');

var MessageProducer = function MessageProducer(){
    this._stompClient = null;
};
MessageProducer.prototype.init = function init(){
    this._stompClient = new Stomp('127.0.0.1', 61613, 'user', 'pw');
    this._stompClient.connect(function(sessionId){
        console.log("STOMP client connected.");
    });
};
MessageProducer.prototype.sendMessage = function sendMessage(messageToPublish){
    this._stompClient.publish('/queue/queue1', messageToPublish);
};
module.exports = new MessageProducer();