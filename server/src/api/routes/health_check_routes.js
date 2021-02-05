var express = require('express');
var router = express.Router();

/**
 * @api {get} /status/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Status
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
router.get("/", function (req, res, next) {
        console.log("asyncstatusbyuserdevice user: " + req.params.userid + " device: " + req.params.deviceid);
        res.json({"status": "ok" });
    });

module.exports = router;
