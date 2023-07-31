const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcrypt')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')

//Register new users
Router.post(
    '/register', 
    asyncHandler(async(req,res) => {
        //get user info from data object
        const { name, email, password } = req.body.data

        //if email already exists, the route will respond with a 'failed' message which will trigger an alert on our frontend. 
        const invalidEmail = await User.findOne({ email })
        if(invalidEmail){
            res.status(418).send('failed')
        } else {
            //email is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            //passing req info + hashed pasword into User model
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            })

            //saving newUser to db
            await newUser.save()

            //if user account is successfully created, the route will send a success message that will trigger a bootstap alert on the frontend letting the user know an account was created.
            res.status(200).send('success')  
        }
    })
)

//Login existing users
Router.post(
    '/login', 
    passport.authenticate('local'),
    function(req, res) {
        res.send('ok')
    }
);

//check if a user is authenticated and retrieve user information
Router.get(
    '/getuser',
    (req,res) => {
        res.send(req.user)
    }
)

//logout user 
Router.get(
    "/logout", 
    (req, res, next) => {
        req.logout(function(err) {
            if (err) return next(err)
            res.send('success')
        })
    }
)

module.exports = Router