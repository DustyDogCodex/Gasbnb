const User = require("../models/Users")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const createAccount = asyncHandler(
    async(req,res) => {
        //get user info from req.body
        const { name, email, password } = req.body

        //if email already exists, the route will respond with a 'failed' message which will trigger an alert on our frontend. 
        const invalidEmail = await User.findOne({ email })
        
        if(invalidEmail){
            //if email already exists in our database, we send a failed message so an alert will let the user know to use a dfferent email
            res.status(418).send('failed')
        } else {
            //email is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            //checking for uploaded file. 
            const profileImage = req.file ? req.file.filename : ''

            //passing req info + hashed pasword into User model
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                avatar: profileImage
            })

            //saving newUser to db
            await newUser.save()

            //if user account is successfully created, the route will send a success message
            res.status(200).send('success') 
        } 
    }
)

module.exports = { createAccount }