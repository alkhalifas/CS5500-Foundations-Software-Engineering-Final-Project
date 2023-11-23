// Answer Document Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Not sure with docs
        trim: true, // Removes whitespace like "s alkhalifa"
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts lowercase
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address eg alkhalifas@gmail.com'],
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);
