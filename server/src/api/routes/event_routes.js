// copyright and license inspection - no issues 4/13/22


const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

// const VerifyToken = require(__root + 'api/services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const event = require('../models/event');

// RETURNS ALL THE EVENTS IN THE DATABASE
router.get('/station/:stationid', function (req, res) {
    console.log("event route stationid = " + stationid)
    let exclude_measurement = true
    event.getLastN(req.params.stationid, 103, exclude_measurement, function (err, events) {
        if (err) return res.status(500).send("There was a problem finding the events.");
        res.status(200).send(events);
    });
});

// GETS A SINGLE EVENT FROM THE DATABASE
router.get('/:id', function (req, res) {
    console.log("event route id = " + id)
    event.findById(req.params.stationid, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the events.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

module.exports = {
    router
};
