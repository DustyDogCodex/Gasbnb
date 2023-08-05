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
    asyncHandler( async(req,res,next) => {
        
        //for testing and dev
        /* res.json({ name: req.body.name, email: req.body.email, password: req.body.password}) */

        //if email already exists, the route will respond with a 'failed' message which will trigger an alert on our frontend. 
        const invalidEmail = await User.findOne({ email: req.body.email })
        if(invalidEmail){
            res.send('failed')
        } else {
            //email is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //passing req info + hashed pasword into User model
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })

            //saving newUser to db
            const user = await newUser.save()

            //if user account is successfully created, the route will send a success message that will trigger a bootstap alert on the frontend letting the user know an account was created.
            res.send('success')  
        }
    })
)

//Login existing users. Using bcrypt compare now instead of passport local
//app is small enough to justify not using passport
Router.post(
    '/login', 
    passport.authenticate('local', { failureRedirect: "/" }),
    function(req, res) {
        res.send('ok')
    }
);

//simple get request to check if a user is authenticated and retrieve user information
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