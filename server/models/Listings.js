const mongoose = require('mongoose')
const { Schema } = mongoose

const ListingsSchema = new Schema ({
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

const ListingModel = mongoose.model('Listing', ListingsSchema)

module.exports = ListingModel