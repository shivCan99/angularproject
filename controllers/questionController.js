const Question = require('../models/Question')


const getAllQuestions = (
    (req, res) => {
        const questions = Question.find()
            .then(questions => {
                if (!questions) return res.status(204).send("There is no Questions in DataBase") //201 - No content
                //Else
                res.send(questions)
            })
    }
)

const addQuestion = (
    async (req, res) => {
        try {
            const question = new Question({
                question: req.body.question,
                optA: req.body.optA,
                optB: req.body.optB,
                optC: req.body.optC,
                correctAnswer: req.body.correctAnswer
            })

            await question.save()
            res.status(201).send(question)
        } catch (error) {
            res.status(400).send({ error: error.message }) //400 - Bad Request
        }
    }
)

const deleteQuestionById = (
    (req, res) => {
        idToDelete = new ObjectId(req.params._id)
        Question.deleteOne({_id: idToDelete})
        .exec()
        .then((data) => {
            if (data.deletedCount === 0) return res.status(404).send("Data Not Found")
            //Else  
            res.status(201).send("Deleted Successfully")
            console.log(data);
        })
    }
)

module.exports = {
    getAllQuestions,
    addQuestion,
    deleteQuestionById
}