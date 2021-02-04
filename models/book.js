const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongodb will auto create id so don't need to define here
const bookSchema = new Schema({
 name: String,
 genre: String,
 authorId: String
})


module.exports = mongoose.model('Book', bookSchema)