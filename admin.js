const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const adminModel = new mongoose.Schema({
    email: String,
    pass: String
})

module.exports = mongoose.model("Admin", adminModel)