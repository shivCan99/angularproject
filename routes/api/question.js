const express = require('express');
const router = express.Router();

const questionControllers = require('../../controllers/questionController')

router.route('/')
    .get(questionControllers.getAllQuestions)
    .post(questionControllers.addQuestion)

router.route('/:_id')
    .delete(questionControllers.deleteQuestionById)


module.exports = router