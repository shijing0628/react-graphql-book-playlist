const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongodb will auto create id so don't need to define here
const authorSchema = new Schema({
 name: String,
 age: Number
})


module.exports = mongoose.model('Author', authorSchema)