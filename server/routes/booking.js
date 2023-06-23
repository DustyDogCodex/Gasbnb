const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing bookings model
const Booking = require('../models/Bookings')

Router.post('/new-booking',
    asyncHandler(async(req,res) => {
        //extract data from req.body.data
        const { userId, listingId, checkInDate, checkOutDate, numGuests, totalCost } = req.body
        
        //create new instance of booking
        const newBooking = new Booking({
            userId,
            listingId, 
            checkInDate, 
            checkOutDate, 
            numGuests,
            totalCost
        })

        //save booking to database
        await newBooking.save()
        .catch(err => console.log(err))

        res.send('success')
    })
)

Router.get('/booking-info/:userId',
    asyncHandler(async(req,res) => {
        //find booking by userId
        const { userId } = req.params

        const selectedBooking = await Booking.find({ userId }).populate('listingId')

        res.send(selectedBooking)
    })
)

module.exports = Router