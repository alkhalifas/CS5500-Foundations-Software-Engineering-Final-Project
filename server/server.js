// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import Route Methods
const home_function = require("./routes/get_home");
const all_questions_function = require("./routes/all_questions");
const questions_function = require("./routes/get_questions");
const tags_function = require("./routes/get_tags");
const answers_function = require("./routes/get_answers");
const post_question_function = require("./routes/post_question");
const get_questions_by_tag_name_function = require("./routes/get_questions_by_tag_name");
const get_questions_by_tag_id_function = require("./routes/get_questions_by_tag_id");
const get_tags_with_count_function = require("./routes/get_tags_with_count");
const post_increment_question_view_function = require("./routes/post_increment_question_view")
const post_answer_function = require("./routes/post_answer");

const User = require("./models/users");
const Question = require("./models/questions");
const Answer = require("./models/answers");

// Provision App
const app = express();
const PORT = 8000;

// Configure Database
const mongoDB = 'mongodb://127.0.0.1:27017/fake_so';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
    console.log('Connected to database');
});

// Configure CORS/Express
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

/*
Method that returns homepage message
 */
app.get('/', async (req, res) => {
    await home_function.home(res);
});

/*
Method that returns everything
 */
app.get('/questions/all', async (req, res) => {
    await all_questions_function.allQuestions(res);
});

/*
Method that provides a question and all its stuff
 */
app.get('/question/:id', async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId)
            .populate('tags')
            .populate('answers')
            .populate('accepted');

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
Method that gets a questions accepted answer
 */
app.get('/questions/:id/accepted-answer', async (req, res) => {
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
app.get('/questions', async (req, res) => {
    const sortType = req.query.sort || 'newest'; // Default to 'newest' if no sort parameter is provided
    const searchInput = req.query.searchInput;
    const page = req.query.page || 1;
    await questions_function.questions(res, sortType, searchInput, page);
});

/*
Method that returns all tags and their IDs
 */
app.get('/tags', async (req, res) => {
    await tags_function.tags(res);
});

/*
Method that returns the answers to a given question
 */
app.get('/questions/:questionId/answers', async (req, res) => {
    const { questionId } = req.params;
    const page = req.query.page || 1;
    await answers_function.answers(res, questionId, page);
});

/*
Method that posts a new question
 */
app.post('/questions', async (req, res) => {
    const { title, text, tags, asked_by } = req.body;
    await post_question_function.post_question(res, title, text, tags, asked_by);
});

/*
Method that posts a new answer to a given question
 */
app.post('/questions/:questionId/answers', async (req, res) => {
    const { questionId } = req.params;
    const { text, ans_by } = req.body;
    await post_answer_function.post_answer(res, questionId, text, ans_by);
});

/*
Method that gets questions for a given tag
 */
app.get('/questions/tag/:tagName', async (req, res) => {
    const { tagName } = req.params;
    await get_questions_by_tag_name_function.get_questions_by_tag_name(res, tagName);
});

/*
Method that returns questions for a given tan id
 */
app.get('/questions/tag-id/:tagId', async (req, res) => {
    const { tagId } = req.params;
    const page = req.query.page || 1;
    await get_questions_by_tag_id_function.get_questions_by_tag_id(res, tagId, page);
});


/*
Method that gets tag with teg count
 */
app.get('/tags-with-count', async (req, res) => {
    await get_tags_with_count_function.get_tags_with_count(res);
});

/*
Method that increments views by 1
 */
app.post('/questions/increment-views/:questionId', async (req, res) => {
    const { questionId } = req.params;
    await post_increment_question_view_function.post_increment_question_view(res, questionId);
});

/*
Method that returns tagName for a given tag id
 */
app.get('/tags/tag-id/:tagId', async (req, res) => {
    const { tagId } = req.params;
    await get_tag_name_by_tag_id_function.get_tag_name_by_tag_id(res, tagId);
});

/*
method that lets user register account
 */
app.post('/register', async (req, res) => {
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

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).send('Error registering new user');
        console.error("Registration error: ", error);
    }
});

/*
Method that lets user log in
 */
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Search for user by username and return if not found
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({'message': 'Username not found.'});
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({'message': 'Invalid username or password.'});
        }

        // Login successful, create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({'message': 'Unknown error. Please contact admin.'});
        console.error("Login error: ", error);
    }
});


app.post('/update-reputation', async (req, res) => {
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



const verifyUserSessionToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    console.log("token: ", token)

    if (!token) {
        return res.status(401).send('Access Denied: No token provided');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log("verified: ", verified)
        req.user = verified;
        next();
    } catch (error) {
        console.log("error: ", error)
        res.status(400).send('Invalid Token');
    }
};

app.get('/user', verifyUserSessionToken, async (req, res) => {
    try {
        // Get profile without password field
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            // If user not found
            return res.status(404).send('User not found');
        }
        // If usser found:
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user data');
        console.error("User data error: ", error);
    }
});

/*
Method to upvote or downvote a question
 */
app.post('/vote/question', async (req, res) => {
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

// app.post('/vote/question', async (req, res) => {
//     try {
//         const { questionId, voteType } = req.body; // voteType: 'upvote' || 'downvote'
//
//         // Find question
//         const question = await Question.findById(questionId);
//         if (!question) {
//             return res.status(404).json({'message': 'Question not found'});
//         }
//
//         // Update the vote field
//         if (voteType === 'upvote') {
//             question.votes += 1;
//         } else if (voteType === 'downvote') {
//             question.votes -= 1;
//         }
//
//         await question.save();
//         res.json({'message': 'Vote updated successfully', 'newVotes': question.votes});
//     } catch (error) {
//         res.status(500).json({'message': 'Error updating vote'});
//         console.error("Vote error: ", error);
//     }
// });

/*
Method to upvote or downvote a answer
 */
app.post('/vote/answer', async (req, res) => {
    try {
        const { answerId, voteType } = req.body;

        // Find answer
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({'message': 'Answer not found'});
        }

        // Update
        if (voteType === 'upvote') {
            answer.votes += 1;
        } else if (voteType === 'downvote') {
            answer.votes -= 1;
        }

        // Save and return
        await answer.save();
        res.json({'message': 'Vote updated successfully', 'newVotes': answer.votes});
    } catch (error) {
        res.status(500).json({'message': 'Error updating vote'});
        console.error("Vote error: ", error);
    }
});


app.post('/accept-answer', async (req, res) => {
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


// Display the specified message when disconnected
process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('Server closed. Database instance disconnected');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error closing database connection:', err);
            process.exit(1);
        });
});

// Display specified  message when starting
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});