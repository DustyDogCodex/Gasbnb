const express = require('express')
const asyncHandler = require('express-async-handler')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const Router = express.Router()

//import listing schema
const Listing = require('../models/Listings')

//multer upload options setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadedImages')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+ '.jpg')
  }
})

const upload = multer({ storage: storage })

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
    asyncHandler(async(req,res) => {
        //user id and imageQueue sent with req
        const { id, imageQueue } = req.body
        
        //extracting input data sent through react-hook-forms in the data object.
        const { title, location, description, extraInfo, checkbox, checkIn, checkOut, maxGuests } = req.body.data

        //creating new listing with user info
        const newListing = new Listing({
            owner: id,
            title,
            location,
            description,
            extraInfo,
            amenities: checkbox,
            checkIn,
            checkOut,
            maxGuests,
            photos: imageQueue
        })

        //saving newly created listing to database.
        await newListing.save()
        
        //successful response
        res.json(newListing)
    }
))   

//for uploading user images through user given link
Router.post("/uploadimage-link",
    asyncHandler( async(req,res) => {
        //getting image link from user request
        const imageLink = req.body.imageLink
        //giving the file a new, unique name using date object
        const fileName = 'image' + Date.now() + '.jpg'

        //trying to set the destination as the same folder used by multer
        //trying to select the root directory and then access the uploadedimages folder
        const dirnameSplit = __dirname.split('\\')
        dirnameSplit.splice(-2,2)
        const rootDirectory = dirnameSplit.join('/')
        console.log(rootDirectory)        
        await imageDownloader.image({
            url: imageLink,
            dest: rootDirectory + '/uploadedImages' + `/${fileName}`
        })
        res.json(fileName)
    })
)

//for uploading images directly from user's device
//added multer middleware to handle array of images (max 20 files per request)
Router.post("/uploadimage-device",
    upload.array('images', 20),
    asyncHandler( async(req,res) => {
        //storing uploaded files in an array
        const uploadedImages = []
        for(let i = 0; i < req.files.length; i++){
            const { path } = req.files[i]
            console.log("path",path)
            //splitting the path and just selecting the filename
            const splitPath = path.split('\\')
            console.log('split path', splitPath)
            const newPath = splitPath[1]
            /* fs.renameSync(path, newPath) */
            console.log("newPath", newPath)
            //replacing /uploadedImages since we already have /uploads in our client side when we display the images.
            uploadedImages.push(newPath)
        }
        res.json(uploadedImages)
    })
)

module.exports = Router