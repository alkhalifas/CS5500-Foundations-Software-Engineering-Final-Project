const Question = require("../models/questions");
const Answer = require("../models/answers");

exports.answers = async function (res, questionId, page) {
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        const answers = await Answer.find({ _id: { $in: question.answers } });
        answers.sort((a, b) => b.ans_date_time - a.ans_date_time);

        // Determine the start and end indices based on the page number
        const answersPerPage = question.accepted ? 4 : 5;
        const startIndex = (page - 1) * answersPerPage;
        const endIndex = startIndex + answersPerPage;

        // Extract the subset of answers for the specified page
        const paginatedAnswers = answers.slice(startIndex, endIndex);

        res.json({
            totalAnswers: answers.length,
            answers: paginatedAnswers,
            currentPage: page,
            totalPages: Math.ceil(answers.length / answersPerPage)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting answers to question' });
    }
}