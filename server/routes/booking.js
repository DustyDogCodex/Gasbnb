const express = require('express')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Router = express.Router()

//importing bookings model
const Booking = require('../models/Bookings')

Router.post('/new-booking',
    asyncHandler(async(req,res) => {
        //extract data from req.body.data
        const { owner, listingId, checkInDate, checkOutDate, numGuests, totalCost } = req.body
        
        //create new instance of booking
        const newBooking = new Booking({
            owner,
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

Router.get('/booking-info/:id',
    asyncHandler(async(req,res) => {
        //find booking by bookingId
        const { id } = req.params

        const selectedBooking = await Booking.find({ owner : id })

        res.send(selectedBooking)
    })
)

module.exports = Router