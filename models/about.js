const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aboutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
})


module.exports = About = mongoose.model('about', aboutSchema)

