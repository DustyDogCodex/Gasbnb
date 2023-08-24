const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const multer = require('multer')
const path = require('path')
const MongoStore = require('connect-mongo')
//all imported routes and files
const authRoute = require('./routes/auth')
const listingRoute = require('./routes/listing')
const bookingRoute = require('./routes/booking')
const settingsRoute = require('./routes/settings')
const passportConfig = require('./passportConfig')
const { createAccount } = require('./controller/auth')
const updateProfilePic = require('./controller/settings')
require('dotenv').config()

const app = express()

//SETTING UP CORS
app.use(cors({ 
    origin: ['https://gasbnb-production.up.railway.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true 
}))
app.use(express.json())

//setting up uploads folder as a static asset
//now if we access //localhost:5000/uploads/image-file-name.jpg we can view uploaded images
app.use('/uploads', express.static('uploadedImages'))

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//setting up express sessions and initializing passportjs
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: { 
        sameSite: "lax",
        secure: false,  //for dev environment
        maxAge: 24 * 60 * 60 * 1000 //one day 
    },
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        dbName: 'test',
        touchAfter: 24 * 3600 // lazy update unless somethings was changed in session data, time period in seconds
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

//creating local variables using middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

/* ----------- Routes involving image upload with multer ------------------ */

//FILE STORAGE / MULTER setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadedImages/");
    },
    filename: function (req, file, cb) {
        //randomizing file name to avoid filename conflicts
        cb(null, Date.now() + "-" + Math.round((Math.random() * 1E9)) + ".jpg")
    }
})
const upload = multer({ storage })

//ROUTES INVOLVING UPLOADING FILES
app.post("/auth/register", upload.single('image'), createAccount)
app.put("/settings/profilepic", upload.single('image'), updateProfilePic)

/* ------------------------------------------------------------------------ */

// Serve static files from the vite build that is now stored in the public folder
app.use(express.static(path.join(__dirname, 'public')))

// Route for handling all other requests and serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000

//routes for registering and authenticating users
app.use('/auth', authRoute)
//routes for creating/updating/deleting listings
app.use('/listings', listingRoute)
//routes for creating/updating/deleting listings
app.use('/bookings', bookingRoute)
//routes for creating/updating/deleting listings
app.use('/settings', settingsRoute)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})