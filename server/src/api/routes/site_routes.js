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
const bodyParser = require('body-parser');
const log = require("../../bubbles_logger").log

const site = require('../models/site')

router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

// GETS A LIST of STATION FROM THE DATABASE BY SITEID - normal case
router.get('/:siteid', function (req, res) {
    let result = getSiteBySiteId(req,res)
});

function getSiteBySiteId( req, res ) {
    log.info("getSiteBySiteId")
    site.getSiteById(req.params.siteid).then( function ( site) {
        if (!site) return res.status(200).send("{}");
        return res.status(200).send(site);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the site - err "+err);
    });
}

module.exports = {
    router
};