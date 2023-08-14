const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing user model
const User = require('../models/Users')

Router.put('/location',
    asyncHandler(async(req,res) => {
        //extracting userId and location from req.body
        const { userId, location } = req.body
        
        //find relevant user and update their location
        await User.findByIdAndUpdate(
            userId,
            { location },
            { new: true }
        )

        res.status(204).send('updated')
    })
)

Router.put('/status',
    asyncHandler(async(req,res) => {
        //extracting userId and location from req.body
        const { userId, status } = req.body
        
        //find relevant user and update their location
        await User.findByIdAndUpdate(
            userId,
            { status },
            { new: true }
        )

        res.status(204).send('updated')
    })
)

module.exports = Router