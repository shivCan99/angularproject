const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    optA: {
        type: String,
        required: true
    },
    optB: {
        type: String,
        required: true
    },
    optC: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
})

module.exports = Question = mongoose.model('questions', QuestionSchema)