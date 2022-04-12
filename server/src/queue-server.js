global.__root   = __dirname + '/';
const event = require('./api/models/event')
const debug = require('debug')('queue-server')

const bubbles_queue = require('./api/models/bubbles_queue')
const outlet = require('./api/models/outlet')
let __queueClient

function setClient(client) {
    __queueClient = client;
}

// TODO service of topic should be distinct from service of queue or queue benefit isn't realized - everything backs up
// behind slow database.
const serveMessageQueue = async() => {
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    debug("serveMessageQueue")
    debug("subscribe to activemq message queue")
    bubbles_queue.init(setClient).then( value => {
        debug("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToQueue(__queueClient, function (body) {
                bubbles_queue.sendMessageToTopic(__queueClient,sendHeaders, body)
                storeMessage(body);
        });
    }, reason => {
        debug("bubbles_queue.init failed "+reason)
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
        // TODO cleanup this message cleanup.  relation of device to user should be irrelevant
        message.userid = 90000009;
        if( message.message_type === 'measurement')
            message.message = ""+message.deviceid+" sensor/measurement "+ message.sensor_name + "/"+message.measurement_name + " = " + message.value +" "+message.units;
        else {
            if (message.message_type === 'switch_event')
                message.message = "" + message.deviceid + " " + message.switch_name + ":" + message.on;
            else
                message.message = "" + message.deviceid + " " + message.message_type;
        }

        if( typeof(message.sample_timestamp) !== 'undefined') {
            message.datetimemillis = message.sample_timestamp;
        } else {
            message.datetimemillis = message.event_timestamp;
        }
        // TODO this should be cleaned up in the message protocol so that it disappears
        message.type = message.message_type;
        message.rawjson = body;
        // TODO need to decide whether to ALSO keep a file for each json message - hmmmm
        message.filename = '';
        switch( message.message_type) {
            case 'measurement':
              //       console.log("inserting new event "+JSON.stringify(event))
                if( message.type === 'measurement' ) {
                    message.value_name = message.measurement_name
                    message.stringvalue = '' + message.value
                }

                break;
            case 'switch_event':
                let x = await outlet.setStateByNameAndStation(message.switch_name, message.stationid, message.on)
                console.info( "setState returns "+JSON.stringify(x))
                break;
            default:
                console.error("Unhandled message type for storage " + JSON.stringify(message))
                return;
        }
        let ev = await event.createEvent(message);
        debug("storeMessage stored event " + JSON.stringify(ev))
    } catch( err ) {
        console.error("storeMessage error saving message " + err + " " + message)
        return;
    }
}

serveMessageQueue();
