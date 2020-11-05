var express = require('express');
var router = express.Router();
var status = require('../api/status');

/* GET users listing. */
router.get("/status/:userid/:deviceid", function (req, res, next) {
        console.log("statusbyuserdevice user: " + req.params.userid + " device: " + req.params.deviceid);
    status.status(req.params.userid, req.params.deviceid, function (obj) {
        res.render("prettystatus", obj);
    });
});

module.exports = router;
