const mongoose = require('mongoose')

const model = new mongoose.Schema({
    designtype: String,
    name: String, 
    height: String, 
    width: String,
    thumbnail: String, 
    text1: String, 
    text2: String, 
    text3: String, 
    imagelink: String, 
    imagelink1: String, 
    imagelink2: String,
    imagelink3: String,
    imagelink4: String, 
    imagelink5: String,
    author: String,
}, {timestamps:true})

module.exports = mongoose.model("Image",model)