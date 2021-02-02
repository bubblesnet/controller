const cors = require('cors')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../models/user')

const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
const User = require('../services/user');

/**
 * Configure JWT
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const config = require('../../config/locals'); // get config file

let myPlaintextPassword = "xyz"
let myhash = ""

bcrypt.genSalt(saltRounds, async function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if( err ) {
            console.log("Error " + err )
        }
        // Store hash in your password DB.
        myhash = hash
        console.log("myhash = " + hash)
    });
});

router.post('/login', function(req, res) {
    console.log("api/auth/login generating token")
    findUser(req, res)
})

function findUser(req,res) {
    user.findOne(req.body.email, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        let passwordIsValid = bcrypt.compareSync(req.body.password, myhash);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        let token = jwt.sign({ id: user._id }, config.getLocals().secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });

}

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});


router.post('/register', function(req, res) {
    return (newUser(req, res,
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user`.");

            // if user is registered without errors
            // create a token
            let token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({auth: true, token: token});
        }));
});

function newUser(req,res, cb) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    user.createUser({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        }, cb )
        .then(function (user) {
            console.log("Created real new user "+JSON.stringify(user));
            return( user )
        })
        .catch(function (err) {
            console.log("new User error "+err)
            return( {} )
        })
    ;
}

router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });

});

module.exports = router;