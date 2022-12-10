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

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../models/user')

const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
 * Configure JWT
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const config = require('../../config/locals'); // get config file

let myPlaintextPassword = "xyz"
let myhash = ""

bcrypt.genSalt(saltRounds, async function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if( err ) {
            log.error("Error " + err )
        }
        myhash = hash
//        log.info("myhash = " + hash)
    });
});

router.post('/login', function(req, res) {
    log.info("api/auth/login generating token")
    x = findUser(req, res).then( function(data) {
        log.debug("then findUser " + JSON.stringify(data))
    })
    log.info("after findUser " + JSON.stringify(x))
})

async function findUser(req,res) {
    log.info("Calling findOneByUsername with body = " + JSON.stringify(req.body) )
    let u = await user.findOneByUsername(req.body.username).then( function (user) {
        log.info("findOneByUsername callback user = " + JSON.stringify(user))
        if (!user) {
            log.error("Sending 401 - auth failed No user found user = " + user)
            return res.status(401).json({message: ''});
        }

        // check if the password is valid
        log.info("Checking password")
        let passwordIsValid = bcrypt.compareSync(req.body.password, myhash);
        if (!passwordIsValid){
            log.error("Sending 401 - auth failed")
            return res.status(401).json({message: "", auth: false, token: null });
        }

        // if user is found and password is valid
        // create a token
        let token = jwt.sign({ id: user._id }, config.getLocals(true).secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        let retval = user
        user.auth = true
        user.token = token
        log.info("returning 200 " + JSON.stringify(retval))
        return res.status(200).json(retval);
    }).catch(function(err) {
        log.error("Returning 500 error " + err)
        if (err) return res.status(500).json({message: 'Error on the server .'+err});
    });

}

module.exports = {
    router,
    findUser
};