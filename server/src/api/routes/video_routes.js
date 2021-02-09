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

function getImage( req, res, next ) {
    let userdirectory = locals.getLocals().usersdirectory + '/' + req.params.userid;

    let picturefile = userdirectory + '/bubblespictures/' + req.params.filename;
    console.log('filename is ' + picturefile);
    fs.readFile(picturefile, function (err, data) {
        console.log('filename is ' + picturefile);
        if (err) {
            res.writeHead(404, {'Content-Type': 'image/jpeg'});
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data);
            res.end();
        }
    });
}

router.get('/:userid/:deviceid/:filename', function (req, res, next) {
    getImage(req,res,next)
});




module.exports = {
    getImage,
    router
};
