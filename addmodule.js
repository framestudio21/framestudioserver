const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name: String,
    email: String, 
    thumbnail: String,
}, {timestamps:true})

module.exports = mongoose.model("Advertisement",model)