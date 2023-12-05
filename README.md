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
- [X] Server Routes
- [X] All Tags
- [X] User Schema
- [X] Comment Schema
- [ ] PUT and DELETE for Q, A, nad T

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

| #  | Use-case Name                                   | Test case Name | Status   |
|----|-------------------------------------------------|----------------|----------|
| 1  | Welcome Page Content Check                      | Test-1.1       | Passing  |
| 2  | Register Page Content Check                     | Test-1.2       | Passing  |
| 3  | Login page navigate to                          | Test-1.3       | Passing  |
| 4  | Proceed as Guest navigate to                    | Test-1.4       | Passing  |
| 5  | Welcome Page navigate to                        | Test-1.5       | Passing  |
| 6  | Confirm Class and IDs 1/2                       | Test-1.6       | Passing  |
| 7  | Confirm Class and IDs 2/2                       | Test-1.7       | Passing  |
| 8  | Register User                                   | Test-2.1       | Passing  |
| 9  | Register User, Add Answer                       | Test-2.2       | Passing  |
| 10 | Login, Display Data                             | Test-2.3       | Passing  |
| 11 | Login, Ask Question with Existing Tag           | Test-2.4       | Passing  |
| 12 | Login, Ask Question with New Tag, High Rep      | Test-2.4.1     | Passing  |
| 13 | Login, Ask Question with New Tag, Low Rep       | Test-2.4.2     | Passing  |
| 14 | See Tags Page                                   | Test-2.5       | Passing  |
| 15 | Profile Page                                    | Test-2.6       | Passing  |
| 16 | Ask Question Empty Title Error                  | Test-2.7       | Passing  |
| 17 | Ask Question Empty Text Error                   | Test-2.7.1     | Passing  |
| 18 | Ask Question Empty Tag Error                    | Test-2.7.2     | Passing  |
| 19 | Upvote Question, Reputation Check               | Test-3.0       | Passing  |
| 20 | Downvote Question, Reputation Check             | Test-3.1       | Passing  |
| 21 | Filter Unanswesred, Ask Question, Confirm       | Test-3.2       | Passing  |
| 22 | Open Question, Confirm Current Answers          | Test-3.3       | Passing  | 
| 23 | Login, Filter Newest, Upvote Answer, Confirm    | Test-3.4       | Passing  | 
| 24 | Login, Filter Active, Upvote Answer, Confirm    | Test-3.5       |          | 
| 25 | Upvote Answer, Reputation Check                 | Test-3.6       |          | 
| 26 | Downvote Answer, Reputation Check               | Test-3.7       |          | 
| 27 | Search Tags, Check Responses                    | Test-4.0       |          | 
| 28 | Search Text, Check Responses                    | Test-4.1       |          | 
| 29 | Search Tags and Text, Check Responses           | Test-4.2       |          | 
| 30 | View Questions, Sort by Newest                  | Test-5.1       |          | 
| 31 | View Questions, Sort by Active                  | Test-5.2       |          | 
| 32 | View Questions, Sort by Unanswered              | Test-5.3       |          | 
| 33 | Guest Accessing Application                     | Test-6.0       |          | 
| 34 | Guest can see questions                         | Test-6.1       |          | 
| 35 | Guest cannot access profile page                | Test-6.2       |          | 
| 36 | Guest cannot ask a question                     | Test-6.3       |          | 
| 37 | Guest cannot answer a question                  | Test-6.4       |          | 
| 38 | Guest cannot comment                            | Test-6.5       |          | 
| 39 | Guest cannot vote                               | Test-6.6       |          | 
| 40 | Create comment for question                     | Test-7.0       |          | 
| 41 | Create comment for answer                       | Test-7.1       |          | 
| 42 | Create multiple comments for question, paginate | Test-7.2       |          | 
| 43 | Create multiple comments for answer, paginate   | Test-7.3       |          | 

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
