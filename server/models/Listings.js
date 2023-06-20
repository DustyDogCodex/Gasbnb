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
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    extraInfo: String,
    amenities: [String],
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    photos: [String]
})

const ListingModel = mongoose.model('Listing', ListingsSchema)

module.exports = ListingModel