[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in *images/*

## Instructions to setup and run project

Detailed instructions with all relevant commands go here.

## Team Member 1 Contribution
- [X] Create Account
- [X] Welcome Page
- [X] Login
- [X] Logout
- [ ] Server Routes
- [X] All Tags
- [X] User Schema
- [X] Comment Schema

## Team Member 2 Contribution
- [ ] Homepage
- [ ] New Question
- [ ] Searching
- [ ] New Answer
- [ ] Answers
- [ ] Comments

## Backlog
- [ ] User Profile




## Test cases

| #  | Use-case Name                                    | Test case Name | Status  |
|----|--------------------------------------------------|----------------|---------|
| 1  | Welcome Page Content Check                       | Test-1.1       | Passing |
| 2  | Register Page Content Check                      | Test-1.2       | Passing |
| 3  | Login page navigate to                           | Test-1.3       | Passing |
| 4  | Proceed as Guest navigate to                     | Test-1.4       | Passing |
| 5  | Welcome Page navigate to                         | Test-1.5       | Passing |
| 6  |                                                  | Test-1.6       | Passing |
| 7  |                                                  | Test-1.7       | Passing |
| 8  | Register User                                    | Test-2.1       | Passing |
| 9  | Register User, Add Answer                        | Test-2.2       | Passing |
| 10 | Login, Display Data                              | Test-2.3       | Passing |
| 11 | Login, Ask Question with Existing Tag            | Test-2.4       | Passing |
| 12 | Login, Ask Question with New Tag, High Rep       | Test-2.4.1     | Passing |
| 13 | Login, Ask Question with New Tag, Low Rep        | Test-2.4.2     | Passing |
| 14 | Login, See Tags Page                             | Test-2.5       | Passing |
| 15 | Login, Profile Page                              | Test-2.6       | Passing |
| 16 | Login, Ask Question Empty Title Error            | Test-2.7       | Passing |
| 17 | Login, Ask Question Empty Text Error             | Test-2.7.1     | Passing |
| 18 | Login, Ask Question Empty Tag Error              | Test-2.7.2     | Passing |
| 19 | Login, Upvote Question, Reputation Check         | Test-3.0       | Passing |
| 20 | Login, Downvote Question, Reputation Check       | Test-3.1       | Passing |
| 21 | Login, Filter Unanswesred, Ask Question, Confirm | Test-3.2       | Passing |
| 22 | Login, Open Question, Confirm Views              | Test-3.3       |         | 
| 23 | Login, Filter Newest, Add Answer, Confirm        | Test-3.4       |         | 
| 24 | Login, Filter Active, Add Answer, Confirm        | Test-3.5       |         | 
| 25 | Login, Filter Newest, Add Answer, Confirm        | Test-3.6       |         | 

## Design Patterns Used

- Design Pattern Name:

- Problem Solved:

- Location in code where pattern is used:

## Instructions to run:

Run Mongod:

    brew services start mongodb-community@7.0

Run Server

    SERVER_SECRET=webdev nodemon server.js

Run Client

    npm start
