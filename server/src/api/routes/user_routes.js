const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const UserModel = require('../models/user');

// CREATES A NEW USER
router.post('/', function (req, res) {
/*    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });

 */
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    /*
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);

    });
    */
});

function getUserById( req, res ) {
    UserModel.findOneByUserid(req.params.id).then( function ( user) {
        if (!user) return res.status(401).send("No user found.");
        return res.status(200).send(user);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the user - err "+err);
    });
}

// GETS A SINGLE USER FROM THE DATABASE BY ID - normal case
router.get('/:id', function (req, res) {
    getUserById(req,res)
});

// GETS A SINGLE USER FROM THE DATABASE - unusual case
function getUserByName( req, res ) {
    console.log("Get by name " + req.params.id)
    UserModel.findOneByUsername(req.params.id).then( function (user) {
        if (!user) return res.status(401).send("No user found.");
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3005")
        res.status(200).send(user);
    }).catch(function(err){
        return res.status(500).send("There was a problem finding the user "+err);
    });
}

router.get('/name/:id', function (req, res) {
    getUserByName(req,res)
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
/*    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });

 */
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
/*    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });

 */
});


module.exports = {
    getUserById,
    getUserByName,
    router
};