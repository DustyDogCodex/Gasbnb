const mongoose = require('mongoose')
const { Schema } = mongoose

const BookingsSchema = new Schema ({
    owner: mongoose.ObjectId,
    listingID: mongoose.ObjectId,
    checkInDate: String,
    checkOutDate: String,
    numGuests: Number,
    totalCost: Number
})

const BookingsModel = mongoose.model('Booking', BookingsSchema)

module.exports = BookingsModel