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
    //storing all uploaded images in uploadedimages folder in our root directory 
    cb(null, 'uploadedImages')
  },
  filename: function (req, file, cb) {
    //selecting a randomized name for the file
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
//user id is sent as a param from the client side and that id is used to locate all listings created by the user in our database
Router.get('/userlistings/:id', 
    asyncHandler(async(req,res) => {
        //grabbing user id from req.params
        const { id } = req.params
        //finding all listings associated with user id
        const userlistings = await Listing.find({ owner: id })

        //send listings back to frontend to display
        res.json(userlistings)
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

        await imageDownloader.image({
            url: imageLink,
            dest: rootDirectory + '/uploadedImages' + `/${fileName}`
        })

        //responding with filename so front-end can find the correct image to call and display
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
            //using path to identify new file name and extracting that name so we can store it in our database as a link to the uploaded image.
            //this link will later be used to load the images when someone visits the listing
            const { path } = req.files[i]
            
            //splitting the path and just selecting the filename
            const splitPath = path.split('\\')
            const newPath = splitPath[1]
            
            //sending path to image to front-end so it can be stored with our listing document once user submits the form
            uploadedImages.push(newPath)
        }
        res.json(uploadedImages)
    })
)

module.exports = Router