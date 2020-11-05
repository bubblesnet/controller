var express = require('express');
var router = express.Router();
var status = require('../api/status');

/* GET users listing. */
router.get("/asyncstatus/:userid/:deviceid", function (req, res, next) {
        console.log("asyncstatusbyuserdevice user: " + req.params.userid + " device: " + req.params.deviceid);
    status.status(req.params.userid, req.params.deviceid, function (obj) {
        res.render("asyncstatus", obj);
    });
});

module.exports = router;
