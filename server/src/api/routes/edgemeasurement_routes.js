var express = require('express');
var router = express.Router();
const bubbles_queue = require('../models/bubbles_queue')

let __edgeMeasurementClient

function setClient(client) {
    __edgeMeasurementClient = client;
}

function initError(error) {
    console.log("error " + error)
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
router.post("/:userid/:deviceid", function (req, res, next) {
    console.log("post measurement user: " + req.params.userid + " device: " + req.params.deviceid);
    if( typeof(__edgeMeasurementClient) === 'undefined' ) {
        bubbles_queue.init(setClient,initError).then(() => {
                // validate json
                // add json to queue
 //               bubbles_queue.sendMessageToQueue(__edgeMeasurementClient, req.body)
 //               bubbles_queue.sendMessageToTopic(__edgeMeasurementClient, req.body)
                // return OK
            console.log("init finished")
                res.json(req.body);
         }
        )
    } else {
        // validate json
        // add json to queue
        console.log("sending to queue "+JSON.stringify(req.body))
        bubbles_queue.sendMessageToQueue(__edgeMeasurementClient, JSON.stringify(req.body))
//        console.log("sending topic " + JSON.stringify(req.body))
//        bubbles_queue.sendMessageToTopic(__edgeMeasurementClient, JSON.stringify(req.body))
        // return OK
        res.json(req.body);
    }
});

module.exports = router;
