const express = require('express')
const asyncHandler = require('express-async-handler')
const imageDownloader = require('image-downloader')
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

//for uploading user images through user given link
Router.post("/uploadimage-link",
    asyncHandler( async(req,res) => {
        //getting image link from user request
        const imageLink = req.body.imageLink
        //giving the file a new, unique name using date object
        const fileName = 'image' + Date.now() + '.jpg'
        await imageDownloader.image({
            url: imageLink,
            dest: __dirname + '/uploadedImages' + `/${fileName}`
        })
        res.json(fileName)
    })
)

//for uploading images directly from user's device
Router.post("/uploadimage-device",
    asyncHandler( async(req,res) => {
        res.send('image will be added from your device!')
    })
)

module.exports = Router