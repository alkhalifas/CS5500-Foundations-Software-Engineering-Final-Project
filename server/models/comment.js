const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    commented_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commented_on: {
        type: Date,
        default: Date.now
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    votes: {
        type: Number,
        default: 0
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
