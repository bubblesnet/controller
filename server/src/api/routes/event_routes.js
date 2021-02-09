const express = require('express');
const router = express.Router();
/*
const bodyParser = require('body-parser');

// const VerifyToken = require(__root + 'api/services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const Event = require('../services/event');

// RETURNS ALL THE EVENTS IN THE DATABASE
router.get('/', function (req, res) {
    Event.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE EVENT FROM THE DATABASE
router.get('/:id', function (req, res) {
    Event.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});
*/
module.exports = {
    router
};
