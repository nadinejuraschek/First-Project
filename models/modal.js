const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    moods: [
        String,
        String,
        String,
        String,
        String
    ],
    questions: [
        {
        question: String,
        answers: [
            String,
            String,
            String
        ]
        },
        {
        question: String,
        answers: [
            String,
            String,
            String
        ]
        },
        {
        question: String,
        answers: [
            String,
            String,
            String
        ]
        }
    ]
});

module.exports = mongoose.model('Question', QuestionSchema);