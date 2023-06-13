const mongoose = require('mongoose')
const { Schema } = mongoose

const BookingsSchema = new Schema ({
    owner: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    extraInfo: String,
    photos: [String],
    amenities: [String],
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
})

const BookingModel = mongoose.model('Booking', BookingsSchema)

module.exports = BookingModel