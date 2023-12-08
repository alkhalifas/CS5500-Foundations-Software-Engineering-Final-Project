const express = require('express');
const User = require("../models/users");
const Comment = require("../models/comment");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const router = express.Router();
const isAuthenticated = require("./isAuthenticated")

/*
Method to get comments for an answer
 */
router.get('/answers/:answerId/comments', async (req, res) => {
    try {
        const { answerId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const comments = await Comment.find({ answer: answerId })
            .populate('commented_by', 'username -_id')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalComments = await Comment.countDocuments({ answer: answerId });

        res.json({
            comments,
            currentPage: page,
            totalPages: Math.ceil(totalComments / limit),
            totalComments
        });
    } catch (error) {
        res.status(500).json({'message': 'Error fetching comments for the answer'});
        console.error("Error: ", error);
    }
});

router.post('/accept-answer', isAuthenticated, async (req, res) => {
    try {
        const { questionId, answerId } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({'message': 'Question not found'});
        }

        if (question.accepted && question.accepted.toString() === answerId) {
            return res.status(400).json({'message': 'This answer is already the accepted answer'});
        }

        if (!question.answers.includes(answerId)) {
            return res.status(400).json({'message': 'Answer is not part of the question'});
        }

        if (question.accepted && !question.answers.includes(question.accepted)) {
            question.answers.push(question.accepted);
        }

        question.answers = question.answers.filter(aId => aId.toString() !== answerId.toString());

        question.accepted = answerId;

        await question.save();
        res.json({'message': 'Accepted answer updated successfully'});
    } catch (error) {
        res.status(500).json({'message': 'Error updating accepted answer'});
        console.error("Error in updating accepted answer: ", error);
    }
});


router.post('/answers/:answerId/comments',isAuthenticated,  async (req, res) => {
    try {
        const { answerId } = req.params;
        const { text, commented_by } = req.body;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({'message': 'Answer not found'});
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
            answer: answerId
        });

        await newComment.save();

        answer.comments.push(newComment._id);
        await answer.save();

        res.status(200).json({'message': 'Comment added to answer successfully', 'comment': newComment});
    } catch (error) {
        res.status(500).json({'message': 'Error adding comment to answer'});
        console.error("Error in adding comment to answer: ", error);
    }
});

/*
Method to get an answer by ID
 */
router.get('/answers/:answerId', async (req, res) => {
    try {
        const { answerId } = req.params;

        const answer = await Answer.findById(answerId)
            .populate('ans_by', 'username -_id')

        if (!answer) {
            return res.status(404).json({'message': 'Answer not found'});
        }

        res.json(answer);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching answer'});
        console.error("Error: ", error);
    }
});

/*
Method to update an answer by ID
*/
router.put('/answers/:answerId', isAuthenticated, async (req, res) => {
    const { answerId } = req.params;
    const { text } = req.body;

    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(answerId, { text }, { new: true });

        if (!updatedAnswer) {
            return res.status(404).json({'message': 'Answer not found'});
        }

        res.json({'message': 'Answer updated successfully', 'updatedAnswer': updatedAnswer});
    } catch (error) {
        res.status(500).json({'message': 'Error updating answer'});
        console.error("Error in updating answer: ", error);
    }
});


/*
Method to delete an answer by ID
*/
router.delete('/answers/:answerId', isAuthenticated, async (req, res) => {
    const { answerId } = req.params;

    console.log("answerId: ", answerId)

    try {
        const answer = await Answer.findById(answerId);

        if (!answer) {
            return res.status(404).json({'message': 'Answer not found'});
        }

        // Delete answers comments
        await Comment.deleteMany({ answer: answerId });

        // Delete the answer
        await Answer.findByIdAndRemove(answerId);

        res.json({'message': 'Answer deleted successfully'});
    } catch (error) {
        res.status(500).json({'message': 'Error deleting answer'});
        console.error("Error in deleting answer: ", error);
    }
});

module.exports = router;

