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


const express = require('express');
const router = express.Router();
const log = require("../../bubbles_logger").log

const bodyParser = require('body-parser');

// const VerifyToken = require(__root + 'api/services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const event = require('../models/event');

// RETURNS ALL THE EVENTS IN THE DATABASE
router.get('/station/:stationid', function (req, res) {
    log.info("event route stationid = " + stationid)
    let exclude_measurement = true
    event.getLastN(req.params.stationid, 103, exclude_measurement, function (err, events) {
        if (err) return res.status(500).send("There was a problem finding the events.");
        res.status(200).send(events);
    });
});

// GETS A SINGLE EVENT FROM THE DATABASE
router.get('/:id', function (req, res) {
    log.info("event route id = " + id)
    event.findById(req.params.stationid, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the events.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

module.exports = {
    router
};
