const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name: String,
    email: String, 
    text: String,
}, {timestamps:true})

module.exports = mongoose.model("Feedback",model)