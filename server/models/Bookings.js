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
    totalCost: Number,
    expirationDate: Date
})

// Creating an index for the expirationDate field to expire one day (86400 seconds) after expiration date
//expiration date will be set equal to checkoutdate
BookingsSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 86400 })

const BookingsModel = mongoose.model('Booking', BookingsSchema)

module.exports = BookingsModel