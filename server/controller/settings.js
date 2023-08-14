const User = require("../models/Users")
const asyncHandler = require('express-async-handler')
const fs = require('fs')

/* ------------------- UPDATE PROFILE PIC -------------------------------- */

const updateProfilePic = asyncHandler(
    async(req,res) => {
        const { userId } = req.body

        //find relevant user 
        const user = User.findById(userId)

        let updatedImage = req.file ? req.file.filename : ''

        //unlink files in the future

        //update user profile pic
        await User.findByIdAndUpdate(
            userId,
            { profilePic: updatedImage },
            { new: true }
        )

        res.status(200).send('updated')
    }
)


module.exports = updateProfilePic