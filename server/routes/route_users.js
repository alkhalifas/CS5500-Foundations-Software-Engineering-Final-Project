const express = require('express');
const User = require("../models/users");
const router = express.Router();
const bcrypt = require('bcrypt');
const Question = require("../models/questions");
const Tag = require("../models/tags");
const Answer = require("../models/answers");


/*
method that lets user register account
 */
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({'message': 'Invalid email format. Email must be of the form local-part@domain.com'});
        }

        // Check if user already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({'message': 'Username already in use'});
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({'message': 'Email already in use'});
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be greater than 5 characters' });
        }

        // Pass cannot contain username or email
        if (password.includes(username) || password.includes(email)) {
            return res.status(400).json({ message: 'Password must not contain username or email' });
        }

        // Create new user with hashed password
        const user = new User({ username, email, password });
        await user.save();

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send('Error registering new user');
        console.error("Registration error: ", error);
    }
});

/*
Method that lets user log in
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Get current user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({'message': 'Username not found.'});
        }

        // Check password matches
        console.log("password: ", password)
        console.log("user.password: ", user.password)
        console.log("bcrypt.compare(password, user.password): ", await bcrypt.compare(password, user.password))
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({'message': 'Invalid username or password.'});
        }

        // Login successful, update session
        // req.session.user = { id: user._id, username: user.username };
        req.session.userId = user._id;  // Storing user ID in session
        req.session.isLoggedIn = true;

        console.log("req.session: ", req.session)

        res.cookie('session.userId', req.session.userId, { maxAge: 900000, httpOnly: true });
        // res.send(req.session.sessionID)
        // res.json({ message: 'Login successful' });
        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).json({'message': 'Unknown error. Please contact admin.'});
        console.error("Login error: ", error);
    }
});

/*
Method that checks current session
 */
router.get('/session-status', (req, res) => {

    console.log("req.session: ", req.session)
    if (req.session.userId) {
        res.json({ isLoggedIn: true, userId: req.session.userId });
    } else {
        res.json({ isLoggedIn: false });
    }
});

/*
Method that logs user out
 */
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error: ", err);
            return res.status(500).send('Error logging out');
        }
        res.send('Logout successful');
    });
});


/*
Method to update a users reputation
 */
router.post('/update-reputation', async (req, res) => {
    try {
        const { username, reputationChange } = req.body;

        // Find user by username, from body of request
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({'message': 'User not found.'});
        }

        // Calculate new reputation
        let newReputation = user.reputation + reputationChange;
        if (newReputation < 0) {
            // Account for negative
            newReputation = 0;
        }

        // Update user
        user.reputation = newReputation;
        await user.save();

        res.json({ 'message': 'Reputation update success', 'newReputation': newReputation });
    } catch (error) {
        res.status(500).json({'message': 'Error updating reputation'});
        console.error("Reputation update error: ", error);
    }
});

/*
Method that gets users data
 */
router.get('/user', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'No user is currently logged in.' });
    }

    try {
        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Error retrieving user information.' });
    }
});

/*
Method to get all questions for the logged-in user
*/
router.get('/user/questions', async (req, res) => {
    try {
        // getting the user ID from the sesion
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({'message': 'Unauthorized - No user logged in'});
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({'message': 'User not valid'});
        }

        const questions = await Question.find({ asked_by: user.username });
        res.json(questions);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching questions for the user'});
        console.error("Error: ", error);
    }
});


/*
Method to get all answers for the logged-in user
*/
router.get('/user/answers', async (req, res) => {
    try {
        // get user ID from the session
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({'message': 'Unauthorized - No user logged in'});
        }

        // Confirm if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({'message': 'User not valid'});
        }

        const answers = await Answer.find({ ans_by: user.username });

        res.json(answers);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching answers for the user'});
        console.error("Error: ", error);
    }
});

/*
Method to get all tags created by the logged-in user
*/
router.get('/user/tags', async (req, res) => {
    try {
        // Fetch user ID from the session
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({'message': 'Unauthorized - No user logged in'});
        }

        const user = await User.findById(userId).populate('posted_tags');
        if (!user) {
            return res.status(404).json({'message': 'User not found'});
        }

        res.json(user.posted_tags);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching tags created by the user'});
        console.error("Error: ", error);
    }
});




module.exports = router;
