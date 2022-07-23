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


var express = require('express');
var router = express.Router();
var locals = require('../../config/locals');
var fs = require('fs');
const fileUpload = require('express-fileupload');
var device = require('../models/device')

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
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message:'No files were uploaded.', files: req.files});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.filename;
    console.log("Uploaded file " + req.files.filename.name)

//    uploadPath = __dirname + '/../../public/'+req.params.userid+'_'+req.params.deviceid+'.jpg'
    uploadPath = __dirname + '/../../public/'+req.files.filename.name

    console.log("copying picture file to " + uploadPath);
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
        if (err) {
            console.error("Failed copying file " + req.files.filename.name + " to " + uploadPath + " " + err)
            return res.status(500).send(err);
        }
        console.log("Copied file " + req.files.filename.name + " to " + uploadPath)
        let dtmillis = millisFromFilename(req.files.filename.name)
        device.setLatestPicture( req.params.deviceid, req.files.filename.name, dtmillis )
        res.json({message:'File '+req.files.filename.name+'+uploaded!'});
    });

});

// 20220723_0102_21 - YYYYMMDD_HHMM_SS
function millisFromFilename(filename) {
    let year = parseInt(filename.substring(0,4))
    let month =  parseInt(filename.substring(4,6))
    let day =  parseInt(filename.substring(6,8))
    let hour =  parseInt(filename.substring(9,11))
    let minute =  parseInt(filename.substring(11,13))
    let second =  parseInt(filename.substring(14,16))
    let millisecond = 0
    let millis = new Date(year,month,day,hour,minute,second,millisecond).getTime()
    return millis
}

module.exports = {
    getImage,
    router
};
