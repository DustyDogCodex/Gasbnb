const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})