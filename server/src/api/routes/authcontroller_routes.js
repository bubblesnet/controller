
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../models/user')

const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


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
            console.error("Error " + err )
        }
        // Store hash in your password DB.
        myhash = hash
        console.log("myhash = " + hash)
    });
});

router.post('/login', function(req, res) {
    console.log("api/auth/login generating token")
    x = findUser(req, res).then( function(data) {
        console.log("then findUser " + JSON.stringify(data))
    })
    console.log("after findUser " + JSON.stringify(x))
})

async function findUser(req,res) {
    console.log("Calling findOneByUsername with body = " + JSON.stringify(req.body) )
    let u = await user.findOneByUsername(req.body.username).then( function (user) {
        console.log("findOneByUsername callback user = " + JSON.stringify(user))
        if (!user) {
            console.log("Sending 401 - auth failed No user found user = " + user)
            return res.status(401).json({message: ''});
        }

        // check if the password is valid
        console.log("Checking password")
        let passwordIsValid = bcrypt.compareSync(req.body.password, myhash);
        if (!passwordIsValid){
            console.log("Sending 401 - auth failed")
            return res.status(401).json({message: "", auth: false, token: null });
        }

        // if user is found and password is valid
        // create a token
        let token = jwt.sign({ id: user._id }, config.getLocals(true).secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        let retval = { auth: true, username: user.username, firstname: user.firstname, lastname: user.lastname, token: token }
        console.log("returning 200 " + JSON.stringify(retval))
        return res.status(200).json(retval);
    }).catch(function(err) {
        console.error("Returning 500 error " + err)
        if (err) return res.status(500).json({message: 'Error on the server .'+err});
    });

}

/*
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
            passwordhash : hashedPassword
        }, cb )
        .then(function (user) {
            console.log("Created real new user "+JSON.stringify(user));
            return( user )
        })
        .catch(function (err) {
            console.error("new User error "+err)
            return( {} )
        })
    ;
}

 */

module.exports = {
    router,
    findUser
};