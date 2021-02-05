global.__root   = __dirname + '/';

const bubbles_queue = require('./api/models/bubbles_queue')
let __queueClient

function setClient(client) {
    __queueClient = client;
}

const serveMessageQueue = async() => {
    console.log("serveMessageQueue")
    console.log("subscribe to activemq message queue")
    bubbles_queue.init(setClient).then( value => {
        console.log("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToQueue(__queueClient, function (body) {
                bubbles_queue.sendMessageToTopic(__queueClient,body)
        });
    }, reason => {
        console.log("bubbles_queue.init failed "+reason)
    });
}

serveMessageQueue();
