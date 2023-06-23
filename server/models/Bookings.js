const mongoose = require('mongoose')
const { Schema } = mongoose

const BookingsSchema = new Schema ({
    userId: mongoose.ObjectId,
    /* adding a ref to populate booking with listing info */
    listingId: { 
        type: mongoose.ObjectId,
        ref: 'Listing'
    },
    checkInDate: String,
    checkOutDate: String,
    numGuests: Number,
    totalCost: Number
})

const BookingsModel = mongoose.model('Booking', BookingsSchema)

module.exports = BookingsModel