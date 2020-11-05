var express = require('express');
var router = express.Router();
var locals = require('../conf/locals');
var fs = require('fs');

/* GET users listing. */
router.get('/picture/:userid/:deviceid/:filename', function (req, res, next) {
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
