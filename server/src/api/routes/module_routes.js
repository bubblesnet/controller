// copyright and license inspection - no issues 4/13/22


const modul = require('../models/module');

const express = require('express');
const router = express.Router();


router.post('/:deviceid/createDefaults', function(req, res) {
    modul.createDefaultSetOfModules({deviceid: req.params.deviceid}).then(function (modul_list) {
        if (!modul_list) return res.status(401).send("No modules created.");
        return res.status(200).send(modul_list);
    }).catch(function (err) {
        return res.status(500).send("There was a problem creating the modules - err " + err);
    });
});

module.exports = {
    router
};
