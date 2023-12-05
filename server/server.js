// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');
const session = require("express-session")
const MongoStore = require('connect-mongo');

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
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// URL
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

// Session Settings
app.use(
    session({
        secret: process.env.SERVER_SECRET,
        cookie: {
            secure: false, // keep false
            httpOnly: 'None',
            sameSite: true,
            maxAge: 3600000 // 1 hour limit

        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/fake_so' })

    })
)

// Import routes
const questionRoutes = require('./routes/route_questions');
const userRoutes = require('./routes/route_users');
const answerRoutes = require('./routes/route_answers');
const voteRoutes = require('./routes/route_vote');
const tagRoutes = require('./routes/route_tags');
app.use(questionRoutes);
app.use(userRoutes);
app.use(answerRoutes);
app.use(voteRoutes);
app.use(tagRoutes);


/*
Method that returns homepage message
 */
app.get('/', async (req, res) => {
    try {
        const response = {"message":"Welcome to Fake StackOverflow API"}
        res.send(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
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