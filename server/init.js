// init.js

const mongoose = require('mongoose');
const User = require('./models/users');
const Question = require('./models/questions');
const Comment = require('./models/comment');
const Answer = require('./models/answers');
const Tag = require('./models/tags');
const bcrypt = require('bcrypt');

let mongoDB = 'mongodb://localhost:27017/fake_so'; // Update with your MongoDB URL
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const sampleUsers = [
    { name: 'Werner Heisenberg', username:"wheisenberg", email: 'wheisenberg@science.com', password: "Password_123", reputation: 100 },
    { name: 'Niels Bohr', username:"nbohr", email: 'nbohr@science.com', password: "Password_123", reputation: 45 },
    { name: 'Ernest Rutherford', username:"eruth", email: 'eruth@example.com', password: "Password_123", reputation: 0 },
    { name: 'JJ Thompson', username:"jjthom", email: 'jjthom@example.com', password: "Password_123", reputation: 0 },
    { name: 'John Dalton', username:"jdalt", email: 'jdalt@example.com', password: "Password_123", reputation: 100 },
    { name: 'Albert Einstein', username:"aeinstein", email: 'aeinstein@example.com' , password: "Password_123", reputation: 100},
    { name: 'Erwin Schrodinger', username:"eschrod", email: 'eschrod@example.com' , password: "Password_123", reputation: 100}
];

const tags = [
    'quantum', 'relativity', 'atom', 'electrons',
    'particles', 'theory', 'physics', 'mathematics'
];

async function createUser(userData) {
    let user = new User({ ...userData, password: userData.password });
    return user.save();
}

async function createTag(tagName) {
    let tag = new Tag({ name: tagName });
    return tag.save();
}

async function createAnswer(text, user) {
    let answer = new Answer({ text: text, ans_by: user.username, votes: 2 });
    return answer.save();
}

async function createComment(text, user) {
    let comment = new Comment({ text: text, ans_by: user.username, votes: 0 });
    return comment.save();
}

async function createQuestion(title, text, tagIds, answerIds, user) {
    let question = new Question({
        title,
        text,
        tags: tagIds,
        answers: answerIds,
        asked_by: user.username
    });
    return question.save();
}

async function populate() {
    try {
        await db.dropDatabase(); // drop to avoid cluttering dbs

        let createdUsers = await Promise.all(sampleUsers.map(user => createUser(user)));
        let createdTags = await Promise.all(tags.map(tag => createTag(tag)));

        // 2 answers per question
        for (let i = 0; i < 10; i++) {
            let questionUser = createdUsers[i % createdUsers.length];
            let answer1 = await createAnswer(`Answer 1 for question ${i + 1}`, questionUser);
            let answer2 = await createAnswer(`Answer 2 for question ${i + 1}`, questionUser);
            let questionTags = [createdTags[i % createdTags.length], createdTags[(i + 1) % createdTags.length]];
            await createQuestion(`Question Title ${i + 1}`, `Question Text ${i + 1}`, questionTags.map(tag => tag._id), [answer1._id, answer2._id], questionUser);
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
}

populate();