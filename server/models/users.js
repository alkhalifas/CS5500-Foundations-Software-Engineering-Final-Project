// Answer Document Schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Not sure with docs
        trim: true, // Removes whitespace like "s alkhalifa"
        minLength: 5
    },
    reputation: {
        type: Number,
        required: true,
        default: 0
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


userSchema.pre('save', async function(next) {
    // check for change
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
