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

const log = require("../../bubbles_logger").log

var express = require('express');
var router = express.Router();
const bubbles_queue = require('../models/bubbles_queue')
const logger = require('../../bubbles_logger').log


let __edgeMeasurementClient


function setClient(client) {
    __edgeMeasurementClient = client;
}

function getClient() {
    return(__edgeMeasurementClient);
}

function initError(error) {
    logger.error("error " + error)
}

/**
 * @api {post} /measurement/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Measurement
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
async function postToMeasurementQueue(req, res, next) {
    if( typeof(__edgeMeasurementClient) === 'undefined' ) {
        await bubbles_queue.init(setClient,initError).then(() => {
                // validate json
                // add json to queue
                //               bubbles_queue.sendMessageToQueue(__edgeMeasurementClient, req.body)
                //               bubbles_queue.sendMessageToTopic(__edgeMeasurementClient, req.body)
                // return OK
                logger.log("silly","init finished");
                bubbles_queue.sendMessageToQueue(__edgeMeasurementClient, JSON.stringify(req.body))
                res.json(req.body);
            }
        )
    }
    else {

        // validate json
        // add json to queue
        logger.log("silly","sending to queue " + JSON.stringify(req.body))
        bubbles_queue.sendMessageToQueue(__edgeMeasurementClient, JSON.stringify(req.body))
//        log.debug("sending topic " + JSON.stringify(req.body))
//        bubbles_queue.sendMessageToTopic(__edgeMeasurementClient, JSON.stringify(req.body))
        // return OK
        res.json(req.body);
    }
}

/**
 * @api {post} /measurement/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Measurement
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
async function postit(req, res, next) {
    return( postToMeasurementQueue(req,res,next))
}


router.post("/:userid/:deviceid", function (req, res, next) {
    logger.silly("post measurement user: " + req.params.userid + " device: " + req.params.deviceid);
    postit(req,res,next)
});

module.exports = {
    getClient,
    postit,
    router
}
