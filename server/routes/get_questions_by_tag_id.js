const Tag = require("../models/tags");
const Question = require("../models/questions");

exports.get_questions_by_tag_id = async function (res, tagId, page) {
    try {
        const tag = await Tag.findById(tagId);

        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        const questions = await Question.find({ tags: tag._id }).populate('tags answers');

        // Determine the start and end indices based on the page number
        const questionsPerPage = 5;
        const startIndex = (page - 1) * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;

        // Extract the subset of questions for the specified page
        const paginatedQuestions = questions.slice(startIndex, endIndex);

        res.json({
            totalQuestions: questions.length,
            questions: paginatedQuestions,
            currentPage: page,
            totalPages: Math.ceil(questions.length / questionsPerPage)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting questions for tag' });
    }
}