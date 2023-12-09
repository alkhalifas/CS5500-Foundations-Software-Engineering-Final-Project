const express = require('express');
const Question = require("../models/questions");
const Comment = require("../models/comment");
const User = require("../models/users");
const Tag = require("../models/tags");
const elementFactory = require("../models/elementFactory");
const Answer = require("../models/answers");
const isAuthenticated = require("./isAuthenticated");
const router = express.Router();

async function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views) {
    try {
        const qstn = elementFactory.create_element('Question', {
            title: title,
            text: text,
            tags: tags,
            asked_by: asked_by,
            answers: answers,
            ask_date_time: ask_date_time,
            views: views,
        });

        await qstn.save();
        return qstn;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function tagCreate(name, userId) {
    try {
        let tag = await Tag.findOne({ name: name.toLowerCase() });

        if (!tag) {
            // Create a new tag if it doesn't exist
            tag = elementFactory.create_element('Tag', { name: name.toLowerCase() });
            await tag.save();

            // Add this tag to the user's posted_tags array to accomodate requirement
            await User.findByIdAndUpdate(userId, { $addToSet: { posted_tags: tag._id } });
        }

        return tag;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function answerCreate(text, ans_by, ans_date_time) {
    try {
        const ans = elementFactory.create_element('Answer', {
            text: text,
            ans_by: ans_by,
            ans_date_time: ans_date_time,
        });

        await ans.save();
        return ans;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getSearchResultsList = (questions, tags, searchInput) => {
    const searchWords = searchInput.toLowerCase().trim().split(/\s+/);

    const regularSearchWords = [];
    const tagSearchWords = [];
    searchWords.forEach(word => {
        if (word.startsWith("[") && word.endsWith("]")) {
            tagSearchWords.push(word.slice(1, -1).toLowerCase());
        } else {
            regularSearchWords.push(word);
        }
    });

    const uniqueQuestionIds = new Set();

    const regularSearchResults = questions.reduce((result, question) => {
        const questionContent = `${question.title.toLowerCase()} ${question.text.toLowerCase()}`;
        if (regularSearchWords.some(word => questionContent.includes(word))) {
            uniqueQuestionIds.add(question._id.toString());
            result.push(question);
        }
        return result;
    }, []);

    const tagSearchResults = questions.filter(question => {
        return tagSearchWords.some(tag => question.tags.includes(tag));
    });

    // Filter out questions already present in tagSearchResults
    const filteredSearchResults = regularSearchResults.filter(question => {
        return !tagSearchResults.some(tagQuestion => tagQuestion._id.toString() === question._id.toString());
    });

    return filteredSearchResults.concat(tagSearchResults);
};

/*
Method that returns everything
 */
router.get('/questions/all', async (req, res) => {
    try {
        const questions = await Question.find().populate('tags answers');
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting all questions, tags, and ther answers' });
    }
});

/*
Method that retrieves a single question by its ID
 */
router.get('/question/:id', async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId)
            .populate('tags')
            .populate({
                path: 'answers',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'commented_by',
                        model: 'User',
                        select: '-password'
                    }
                }
            })
            .populate('accepted')
            .populate('comments');

        if (!question) {
            return res.status(404).json({'message': 'Question not found'});
        }

        res.json(question);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching question'});
        console.error("Error in fetching question: ", error);
    }
});

/*
A method that allows a user to set an accepted answer
 */
router.get('/questions/:id/accepted-answer', async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId).populate('accepted');

        if (!question) {
            return res.status(404).json({'message': 'Question not found'});
        }

        if (!question.accepted) {
            return res.status(404).json({'message': 'No accepted answer for this question'});
        }

        res.json(question.accepted);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching accepted answer'});
        console.error("Error in fetching accepted answer: ", error);
    }
});

/*
Method that returns all questions and associated fields
 */
router.get('/questions', async (req, res) => {
    const sortType = req.query.sort || 'newest'; // Default to 'newest' if no sort parameter is provided
    const searchInput = req.query.searchInput;
    const page = req.query.page || 1;

    try {
        let questions = await Question.find().populate('tags');

        // Map the tags to their names in each question
        questions = questions.map(question => ({
            ...question.toObject(),
            tags: question.tags.map(tag => tag.name)
        }));

        if (searchInput) {
            const tags = await Tag.find();
            const searchResults = getSearchResultsList(questions, tags, searchInput);
            questions = searchResults;
        }

        // Determine the start and end indices based on the page number
        const questionsPerPage = 5;
        const startIndex = (page - 1) * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;

        if (sortType === 'newest') {
            questions.sort((a, b) => b.ask_date_time - a.ask_date_time);
        } else if (sortType === 'active') {
            questions.sort((a, b) => b.updatedAt - a.updatedAt);
        } else if (sortType === 'unanswered') {
            questions = questions.filter(
                (question) => question.answers.length === 0 && (!question.accepted || question.accepted.length === 0)
            ).sort((a, b) => b.ask_date_time - a.ask_date_time);
        }

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
        res.status(500).json({ error: 'Error getting list of questions' });
    }

});


/*
Method that posts a new question
 */
router.post('/questions', isAuthenticated, async (req, res) => {
    const { title, text, tags, asked_by } = req.body;

    const tagNames = tags.split(/\s+/).map(tagName => tagName.trim());
    const normalizedTags = tagNames.map(tag => tag.toLowerCase());

    try {
        const tagIds = [];
        const user = await User.findOne({ username: asked_by }); // Assuming asked_by is the username

        for (const tagText of normalizedTags) {
            let existingTag = await Tag.findOne({ name: tagText });
            if (!existingTag) {
                existingTag = await tagCreate(tagText, user._id);
            }
            tagIds.push(existingTag._id);
        }

        const newQuestion = await questionCreate(title, text, tagIds, [], asked_by, new Date(), 0);
        res.status(200).json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding new question' });
    }
});


/*
A method that allows a user to edit a question
 */
router.put('/questions/:questionId', isAuthenticated, async (req, res) => {
    const questionId = req.params.questionId;
    const { title, text, tags } = req.body;

    try {
        // Split the tags string into an array and remove duplicates
        const tagNames = [...new Set(tags.split(/\s+/))];

        // Convert tag names to ObjectId
        const tagIds = await Promise.all(tagNames.map(async (name) => {
            let tag = await Tag.findOne({ name: name.toLowerCase() });
            if (!tag) {
                tag = new Tag({ name: name.toLowerCase() });
                await tag.save();
            }
            return tag._id;
        }));

        // Find the question by ID and update it
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
            title: title,
            text: text,
            tags: tagIds
        }, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating the question' });
    }
});

/*
Method that posts a new answer to a given question
 */
router.post('/questions/:questionId/answers', isAuthenticated, async (req, res) => {
    const { questionId } = req.params;
    const { text, ans_by } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        const newAnswer = await answerCreate(text, ans_by, new Date());

        question.answers.push(newAnswer._id);
        await question.save();

        res.status(201).json(newAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding new answer' });
    }
});

/*
Method that deletes a question, its answer, and tags
 */
router.delete('/questions/:questionId', isAuthenticated, async (req, res) => {
    const questionId = req.params.questionId;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Delete comments of question
        await Comment.deleteMany({ question: questionId });

        // Also delete comments of answers
        for (const answerId of question.answers) {
            await Comment.deleteMany({ answer: answerId });
        }

        // Delete answers of the question
        await Answer.deleteMany({ _id: { $in: question.answers } });

        // delete the question obj
        await Question.findByIdAndRemove(questionId);

        res.status(200).json({ message: 'Question and its associated data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting the question' });
    }
});

/*
Method that gets questions for a given tag
 */
router.get('/questions/tag/:tagName', async (req, res) => {
    const { tagName } = req.params;
    try {
        const tag = await Tag.findOne({ name: tagName.toLowerCase() });

        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        const questions = await Question.find({ tags: tag._id }).populate('tags answers');

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting questions for tag' });
    }
});

/*
Method that returns questions for a given tan id
 */
router.get('/questions/tag-id/:tagId', async (req, res) => {
    const { tagId } = req.params;
    const page = req.query.page || 1;

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
});

/*
Method that increments views by 1
 */
router.post('/questions/increment-views/:questionId', async (req, res) => {
    const { questionId } = req.params;
    try {
        // Find the question by Id
        // const question = await Question.findById(questionId);
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Increment view by 1
        question.views += 1;

        // Save it
        await question.save();

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error incrementing views' });
    }
});

/*
Method to get comments for a question
 */
router.get('/questions/:questionId/comments', async (req, res) => {
    try {
        const { questionId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const comments = await Comment.find({ question: questionId })
            .populate('commented_by', 'username -_id')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalComments = await Comment.countDocuments({ question: questionId });

        res.json({
            comments,
            currentPage: page,
            totalPages: Math.ceil(totalComments / limit),
            totalComments
        });
    } catch (error) {
        res.status(500).json({'message': 'Error fetching comments for the question'});
        console.error("Error: ", error);
    }
});

/*
Method to add comment to question
 */
router.post('/questions/:questionId/comments', async (req, res) => {
    try {
        const { questionId } = req.params;
        const { text, commented_by } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({'message': 'Question not found'});
        }

        if (text.length > 140) {
            return res.status(400).json({'message': 'Comment must be less than 140 characters'});
        }

        const user = await User.findOne({username: commented_by});
        if (!user) {
            return res.status(404).json({'message': 'User not found'});
        }

        if (user.reputation < 50) {
            return res.status(403).json({'message': 'User does not have enough reputation'});
        }

        const newComment = new Comment({
            text: text,
            commented_by: user,
            question: questionId
        });

        await newComment.save();

        question.comments.push(newComment._id);
        await question.save();

        res.status(200).json({'message': 'Comment added to question successfully', 'comment': newComment});
    } catch (error) {
        res.status(500).json({'message': 'Error adding comment to question'});
        console.error("Error in adding comment to question: ", error);
    }
});

/*
Method that returns the answers to a given question
 */
router.get('/questions/:questionId/answers', async (req, res) => {
    const { questionId } = req.params;
    const page = req.query.page || 1;

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
});

module.exports = router;
