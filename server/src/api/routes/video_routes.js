var express = require('express');
var router = express.Router();
var locals = require('../../config/locals');
var fs = require('fs');

/**
 * @api {get} /picture/:userid/:deviceid/:filename Get a picture from specified device
 * @apiName GetPicture
 * @apiGroup Picture
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 * @apiParam {String} filename Filename of the picture
 *
 * @apiSuccess {Binary} picture jpeg picture binary
 */

router.get('/:userid/:deviceid/:filename', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    var userdirectory = locals.getLocals().usersdirectory + '/' + req.params.userid;

    var picturefile = userdirectory + '/bubblespictures/' + req.params.filename;
    console.log('filename is ' + picturefile);
        fs.readFile(picturefile, function (err, data) {
            console.log('filename is ' + picturefile);
            if (err) {
                res.end();
            }
            else {
                res.write(data);
                res.end();
            }
        });
});




module.exports = router;
