// Question Document Schema
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    accepted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    },
    asked_by: {
        type: String,
        default: 'Anonymous'
    },
    ask_date_time: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);