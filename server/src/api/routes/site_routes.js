const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const site = require('../models/site')

router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

// GETS A LIST of STATION FROM THE DATABASE BY SITEID - normal case
router.get('/:siteid', function (req, res) {
    let result = getSiteBySiteId(req,res)
});

function getSiteBySiteId( req, res ) {
    console.log("getSiteBySiteId")
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