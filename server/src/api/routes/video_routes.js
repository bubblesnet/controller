var express = require('express');
var router = express.Router();
var locals = require('../../config/locals');
var fs = require('fs');
const fileUpload = require('express-fileupload');

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
    let userdirectory = locals.getLocals(false).usersdirectory + '/' + req.params.userid;

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

// default options
router.use(fileUpload());

router.post('/:userid/:deviceid/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message:'No files were uploaded.', files: req.files});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.filename;
    uploadPath = __dirname + '/../../public/'+req.params.userid+'_'+req.params.deviceid+'.jpg'
    console.log("moving picture file to " + uploadPath);
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        console.log("Moved file " + req.files.filename + " to " + uploadPath)
        res.json({message:'File uploaded!'});
    });
});


module.exports = {
    getImage,
    router
};
