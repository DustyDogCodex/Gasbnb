const express = require('express')
const passport = require('passport')
const Router = express.Router()

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