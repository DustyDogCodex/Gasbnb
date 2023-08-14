const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing user model
const User = require('../models/Users')

Router.put('/name',
    asyncHandler(async(req,res) => {
        //extracting userId and location from req.body
        const { userId, name } = req.body
        
        //find relevant user and update their location
        await User.findByIdAndUpdate(
            userId,
            { name },
            { new: true }
        )

        res.status(204).send('updated')
    })
)

Router.put('/email',
    asyncHandler(async(req,res) => {
        //extracting userId and location from req.body
        const { userId, email } = req.body
        
        //find relevant user and update their location
        await User.findByIdAndUpdate(
            userId,
            { email },
            { new: true }
        )

        res.status(204).send('updated')
    })
)

module.exports = Router