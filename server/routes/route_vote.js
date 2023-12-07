const express = require('express');
const router = express.Router();
const Comment = require("../models/comment");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const isAuthenticated = require("./isAuthenticated");

/*
Method to upvote or downvote a answer
 */
router.post('/vote/answer',isAuthenticated,  async (req, res) => {
    try {
        const { answerId, voteType } = req.body;

        const answer = await Answer.findById(answerId).populate('ans_by');
        if (!answer) {
            return res.status(404).json({'message': 'Answer not found'});
        }

        let reputationChange = 0;
        if (voteType === 'upvote') {
            answer.votes += 1;
            reputationChange = 5;
        } else if (voteType === 'downvote') {
            answer.votes -= 1;
            reputationChange = -10;
        }

        await answer.save();

        const author = await User.findOne({username: answer.ans_by});

        if (author) {
            author.reputation += reputationChange;
            await author.save();
        }

        res.json({'message': 'Vote updated successfully', 'newVotes': answer.votes});
    } catch (error) {
        res.status(500).json({'message': 'Error updating answer vote'});
        console.error("Vote error: ", error);
    }
});


/*
Method to upvote or downvote a comment
 */
router.post('/vote/comment', isAuthenticated, async (req, res) => {
    try {
        const { commentId, voteType } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({'message': 'Comment not found'});
        }

        if (voteType === 'upvote') {
            comment.votes += 1;
        } else if (voteType === 'downvote') {
            return res.status(404).json({'message': 'Comment cannot be downvoted'});
        }

        await comment.save();

        res.status(200).json({'message': 'Vote updated successfully', 'newVotes': comment.votes});
    } catch (error) {
        res.status(500).json({'message': 'Error updating answer vote'});
        console.error("Vote error: ", error);
    }
});


/*
Method to upvote or downvote a question
 */
router.post('/vote/question',isAuthenticated,  async (req, res) => {
    try {
        const { questionId, voteType } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({'message': 'Question not found'});
        }

        let reputationChange = 0;
        if (voteType === 'upvote') {
            question.votes += 1;
            reputationChange = 5;
        } else if (voteType === 'downvote') {
            question.votes -= 1;
            reputationChange = -10;
        }

        await question.save();

        const author = await User.findOne({ username: question.asked_by });
        if (author) {
            author.reputation += reputationChange;
            await author.save();
        }

        res.json({'message': 'Vote and reputation updated successfully', 'newVotes': question.votes});
    } catch (error) {
        res.status(500).json({'message': 'Error updating vote and reputation'});
        console.error("Vote and reputation update error: ", error);
    }
});



module.exports = router;
