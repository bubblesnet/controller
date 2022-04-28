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

global.__root   = __dirname + '/';
const event = require('./api/models/event')
const debug = require('debug')('queue-server')

const bubbles_queue = require('./api/models/bubbles_queue')
const outlet = require('./api/models/outlet')
let __queueClient

function setClient(client) {
    __queueClient = client;
}

/// TODO service of topic should be distinct from service of queue or queue benefit isn't realized - everything backs up behind slow database.
const serveMessageQueue = async() => {
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    console.log("serveMessageQueue")
    console.log("subscribe to activemq message queue")
    bubbles_queue.init(setClient).then( value => {
        console.log("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToQueue(__queueClient, function (body) {
                bubbles_queue.sendMessageToTopic(__queueClient,sendHeaders, body)
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
        /// TODO cleanup this message cleanup.  relation of device to user should be irrelevant
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
        message.type = message.message_type;
        message.rawjson = body;
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
