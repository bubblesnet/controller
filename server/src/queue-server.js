global.__root   = __dirname + '/';
const event = require('./api/models/event')

const bubbles_queue = require('./api/models/bubbles_queue')
let __queueClient

function setClient(client) {
    __queueClient = client;
}

// TODO service of topic should be distinct from service of queue or queue benefit isn't realized - everything backs up
// behind slow database. 
const serveMessageQueue = async() => {
    console.log("serveMessageQueue")
    console.log("subscribe to activemq message queue")
    bubbles_queue.init(setClient).then( value => {
        console.log("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToQueue(__queueClient, function (body) {
                bubbles_queue.sendMessageToTopic(__queueClient,body)
                storeMessage(body);
        });
    }, reason => {
        console.log("bubbles_queue.init failed "+reason)
    });
}

async function storeMessage(body) {
    console.log("storeMessage " + body )
    let message;
    try {
        message = JSON.parse(body)
    } catch( error ) {
        console.error("storeMessage error parsing message " + body)
        return;
    }
    try {
        switch( message.message_type) {
            case 'measurement':
                // TODO cleanup this message cleanup.  relation of device to user should be stored in memory
                message.userid = 90000009;
                message.datetimemillis = message.sample_timestamp;
                // TODO this should be cleaned up in the message protocol so that it disappears
                message.type = message.message_type;
                message.message = ""+message.deviceid+" sensor/measurement "+ message.sensor_name + "/"+message.measurement_name + " = " + message.value +" "+message.units;
                message.rawjson = body;
                // TODO need to decide whether to ALSO keep a file for each json message - hmmmm
                message.filename = '';
                let ev = event.createEvent(message);
                console.log("storeMessage stored event " + JSON.stringify(ev))
                break;
            default:
                console.error("Unhandled message type for storage " + JSON.stringify(message))
                break;
        }
    } catch( err ) {
        console.error("storeMessage error saving message " + err + " " + message)
        return;
    }
}

serveMessageQueue();
