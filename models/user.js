const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    authorised: { type: Boolean, default: false }
})
module.exports = mongoose.model('User', userSchema)