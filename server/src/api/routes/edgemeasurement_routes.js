var express = require('express');
var router = express.Router();
const queue = require('../service/queue')

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
    // validate json
    // add json to queue
    queue.add(req.body)
    // return OK
    res.json(req.body);

});


module.exports = router;
