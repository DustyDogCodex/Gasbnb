const mongoose = require('mongoose')
const { Schema } = mongoose

const BookingsSchema = new Schema ({
    userId: mongoose.ObjectId,
    listingId: mongoose.ObjectId,
    checkInDate: String,
    checkOutDate: String,
    numGuests: Number,
    totalCost: Number
})

const BookingsModel = mongoose.model('Booking', BookingsSchema)

module.exports = BookingsModel