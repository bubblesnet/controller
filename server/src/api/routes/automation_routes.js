const express = require('express');
const router = express.Router();
const automation_settings = require('../models/automation_settings')
// const {updateStageSettings} = require("../models/automation_settings");

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

router.post("/:stationid/:stage_name", function (req, res, next) {
    console.log("post automationsettings (" +req.params.stationid+") ("+req.params.stage_name+") "+JSON.stringify(req.body))
    let x = automation_settings.updateStageSettings(req.params.stationid, req.params.stage_name, req.body).then(function (rows) {
        if (!rows) {
            return res.status(200).json({});
        }
        return res.status(200).json({});
    }).catch(function (err) {
        console.log("err " + err)
        return res.status(500).send("There was a problem changing the stage - err " + err);
    });
});

module.exports = {
    router
};
