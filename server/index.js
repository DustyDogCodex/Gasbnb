const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoute = require('./routes/auth')
require('dotenv').config()

const app = express()

//SETTING UP CORS
app.use(cors({ 
  origin: ['http://localhost:5173','http://localhost:5173/login'],
  credentials: true }))
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//setting up express sessions and initializing passportjs
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true,
  cookie: { 
    sameSite: "none",
    secure: false,  //for dev environment
    maxAge: 24 * 60 * 60 * 1000 //one day 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//creating local variables using middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const port = process.env.PORT || 5000

//routes for registering and authenticating users
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})