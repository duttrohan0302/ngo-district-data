//Import Required Libraries
const express = require('express')
const router = express.Router()

// Import bcryptjs and JsonWebToken
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Import Model
const User = require('./../models/User')
const validateLoginInput = require('./../validations/login')

//Import and require Passport
const passport = require("passport");
require("./../middlewares/passport")(passport);

const { secretOrKey } = require('../config')


//Service to check if user already exist
async function findOne(email) {

    let user = await User.findOne({email: email})

    if(user){
        console.log("Service=> Email already exists");
    }
    else{
        console.log("Service=>user doesn't exist")
    }

    return user
}

//Compare password
async function compare (password1, password2) {

    const isSame = await new Promise((resolve, reject) => {
        bcrypt.compare(password1, password2, function(err, result) {
            if(err) reject(err)
            resolve(result)
        })
    })

    return isSame;
}


//Login route
router.post('/login',async function(req, res, next) {
    const { errors, isValid } = validateLoginInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    try {
        const user = await findOne(email);

        if(!user) {
            errors.email= "User not found";
            return res.status(404).json(errors)
        }

        // Check password
        const isSame = await compare(password, user.password);

        if(isSame){
            // Password matched, create payload
            const payload = { id: user.id, name: user.name, email:user.email, phone:user.phone }; //Create JWT Payload
            // Sign token
            jwt.sign(
                payload,
                secretOrKey,
                { expiresIn: 86400 },
                (err, token) => {
                return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
                }
            );
        } else {
            errors.password = "Password Incorrect";
            return res.status(401).json(errors);
        }
    } catch (errors) {
        console.log(errors)
        res.status(400).json(errors);
    }
});

module.exports = router