/// TODO check copyright and license

// authcontroller_routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// const User = require('./services/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/locals');


function register( req,res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
/*
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            const token = jwt.sign({ id: user._id }, config.getLocals().secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
*/
}

router.post('/register', function(req, res) {
    register(req,res)
});

router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});

// add this to the bottom of authcontroller_routes.js
module.exports = router;
