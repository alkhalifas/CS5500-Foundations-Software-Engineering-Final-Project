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
Method that returns all questions and associated fields
 */
app.get('/questions', async (req, res) => {
    const sortType = req.query.sort || 'newest'; // Default to 'newest' if no sort parameter is provided
    const searchInput = req.query.searchInput;
    await questions_function.questions(res, sortType, searchInput);
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
    await answers_function.answers(res, questionId);
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
    await get_questions_by_tag_id_function.get_questions_by_tag_id(res, tagId);
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

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({'message': 'Email or Username already in use'});
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
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).send('Error during login');
        console.error("Login error: ", error);
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