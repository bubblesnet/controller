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

// global.__root   = __dirname + '/';
const message_type = require('./types').message_type
const event = require('./api/models/event')
const device = require('./api/models/device')
const debug = require('debug')('queue-server')
const moment = require('moment')

const bubbles_queue = require('./api/models/bubbles_queue')
const outlet = require('./api/models/outlet')
let __queueClient
const log = require("./bubbles_logger").log

function setClient(client) {
    __queueClient = client;
}

/// TODO service of topic should be distinct from service of queue or queue benefit isn't realized - everything backs up behind slow database.
const serveMessageQueue = async() => {
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    log.info("serveMessageQueue")
    log.info("subscribe to activemq message queue")
    bubbles_queue.init(setClient).then( value => {
        log.info("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToQueue(__queueClient, function (body) {
                bubbles_queue.sendMessageToTopic(__queueClient,sendHeaders, body)
                storeMessage(body);
        });
    }, reason => {
        log.info("bubbles_queue.init failed "+reason)
    });
}

async function storeMessage(body) {
    log.info("storeMessage " + body )
    let message;
    try {
        message = JSON.parse(body)
    } catch( error ) {
        log.error("storeMessage error parsing message " + body)
        return;
    }
    try {
        /// TODO cleanup this message cleanup. relation of device to user should be irrelevant
        message.userid = 90000009;

        if( message.message_type === message_type.measurement)
            message.message = ""+message.deviceid+" sensor/measurement "+ message.sensor_name + "/"+message.measurement_name + " = " + message.value +" "+message.units;
        else {
            if (message.message_type === message_type.switch_event)
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
            case message_type.measurement: /// TODO WHAT THE F?  TYPE AND MESSAGE_TYPE???
              //       log.info("inserting new event "+JSON.stringify(event))
                if( message.type === message_type.measurement ) {
                    message.value_name = message.measurement_name
                    message.stringvalue = '' + message.value
                }

                break;
            case message_type.switch_event:
                let x = await outlet.setStateByNameAndStation(message.switch_name, message.stationid, message.on)
                log.info( "setState returns "+JSON.stringify(x))
                break;
            case message_type.dispenser_event:
                x = await outlet.setDispenserStateByNameAndStation(message.dispenser_name, message.stationid, message.on)
                log.info( "setState returns "+JSON.stringify(x))
                break;
            case message_type.picture_event:
                log.debug("ignoring message_type picture_event")
                break;
            default:
                log.error("Unhandled message type for storage " + JSON.stringify(message))
                return;
        }
        let ev = await event.createEvent(message);
        log.debug("storeMessage stored event " + JSON.stringify(ev))

        // Set that this device was last seen just now.  This may be too costly to do as
        // a database update
        let justseen_result = await device.setJustSeenFromMessage(message)
        log.info("justseen returns " + JSON.stringify(justseen_result))
    } catch( err ) {
        log.error("storeMessage error saving message " + err + " " + message)
        return;
    }
}

serveMessageQueue();
