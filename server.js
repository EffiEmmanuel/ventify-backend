require('dotenv').config()
const { json } = require('express')
const cors = require('cors')
const express = require('express')
const app = express()
const waitlistRouter = require('./routes/Waitlist')

// Connect to the database
require('./lib/db')

// MIDDLEWARES
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', waitlistRouter)


const PORT = process.env.PORT || 5000

app.listen (PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`)
})