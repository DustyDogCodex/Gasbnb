const User = require("../models/Users")
const asyncHandler = require('express-async-handler')
const fs = require('fs')

/* ------------------- UPDATE PROFILE PIC -------------------------------- */

const updateProfilePic = asyncHandler(
    async(req,res) => {
        const { userId } = req.body

        //find relevant user 
        const user = await User.findById(userId)

        //unlink files in the future
        let updatedImagePath = req.file ? req.file.filename : ''
        
        //delete previous user profile pic from server
        fs.unlink('uploadedImages/' + user.avatar, (err) => {
            if (err) {
                console.log(err)
            }
        })

        //update user profile pic
        await User.findByIdAndUpdate(
            userId,
            { avatar: updatedImagePath },
            { new: true }
        )

        res.status(200).send('updated')
    }
)

module.exports = updateProfilePic