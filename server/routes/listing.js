const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//import listing schema
const Listing = require('../models/Listings')

//for getting all available listings to display on the homepage
Router.get('/available', 
    asyncHandler((req,res) => {
        res.send('there are available listings in your area!')
    }
))

//for getting rentals created by user. These are displayed in the users account page ('/account/MyRentals)
Router.get('/userlistings', 
    asyncHandler((req,res) => {
        res.send('there are available listings in your area!')
    }
))

//for getting a selected user created listing
Router.get('/userlistings/:id', 
    asyncHandler((req,res) => {
        const { id } = req.params
        res.send('this is the listing you are looking for')
    }
))

//for creating a new listing by a logged in user.
Router.post("/new", 
    asyncHandler((req,res) => {
        res.send('you want to create a new listing? In this economy?')
    }
))

module.exports = Router