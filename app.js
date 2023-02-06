var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.port || 8080
const path = require('path')
var authRoute = require('./routes/auth-route')
var mongoose = require('mongoose')
var cors = require('cors')
mongoose.connect('mongodb+srv://Soumyadip:20csu214@cluster0.jm2zckm.mongodb.net/CafeShop?retryWrites=true&w=majority', (err) => {
    if (!err) {
        console.log("Database Connected")
    }
})
app.use(cors())
app.use(bodyParser.json())
app.use('/auth', authRoute)
app.listen(port, () => {
    console.log(`Port: ${port}`)
})