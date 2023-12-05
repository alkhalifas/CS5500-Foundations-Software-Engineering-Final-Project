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
- [X] Comments
- [X] PUT and DELETE for Q/A/T
- [ ] Testing

## Team Member 2 Contribution
- [X] Homepage
- [X] New Question
- [X] Searching
- [X] New Answer
- [X] Answers
- [ ] User Profile
- [ ] Active Filter

## Backlog




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
| 8  | Register User, Success                          | Test-2.1       | Passing  |
| 9  | Register User, Existing Username                | Test-2.1.1     | Passing  |
| 10 | Register User, Existing Email                   | Test-2.1.2     | Passing  |
| 11 | Register User, Passwords dont match             | Test-2.1.3     | Passing  |
| 12 | Register User, Add Answer                       | Test-2.2       | Passing  |
| 13 | Login, Success                                  | Test-2.3       | Passing  |
| 14 | Login, Username incorrect                       | Test-2.3.1     | Passing  |
| 15 | Login, Password incorrect                       | Test-2.3.2     | Passing  |
| 16 | Login, Fields Missing                           | Test-2.3.3     | Passing  |
| 17 | Login, Ask Question with Existing Tag           | Test-2.4       | Passing  |
| 18 | Login, Ask Question with New Tag, High Rep      | Test-2.4.1     | Passing  |
| 19 | Login, Ask Question with New Tag, Low Rep       | Test-2.4.2     | Passing  |
| 20 | See Tags Page                                   | Test-2.5       | Passing  |
| 21 | Profile Page                                    | Test-2.6       | Passing  |
| 22 | Ask Question Empty Title Error                  | Test-2.7       | Passing  |
| 23 | Ask Question Empty Text Error                   | Test-2.7.1     | Passing  |
| 24 | Ask Question Empty Tag Error                    | Test-2.7.2     | Passing  |
| 25 | Upvote Question, Reputation Check               | Test-3.0       | Passing  |
| 26 | Downvote Question, Reputation Check             | Test-3.1       | Passing  |
| 27 | Filter Unanswesred, Ask Question, Confirm       | Test-3.2       | Passing  |
| 28 | Open Question, Confirm Current Answers          | Test-3.3       | Passing  | 
| 29 | Login, Filter Newest, Upvote Answer, Confirm    | Test-3.4       | Passing  | 
| 30 | Login, Filter Active, Upvote Answer, Confirm    | Test-3.5       | Passing  | 
| 31 | Upvote Answer, Reputation Check                 | Test-3.6       | Passing  | 
| 32 | Downvote Answer, Reputation Check               | Test-3.7       | Passing  | 
| 33 | Search Tags, Check Responses                    | Test-4.0       |          | 
| 34 | Search Text, Check Responses                    | Test-4.1       |          | 
| 35 | Search Tags and Text, Check Responses           | Test-4.2       |          | 
| 36 | View Questions, Sort by Newest                  | Test-5.1       |          | 
| 37 | View Questions, Sort by Active                  | Test-5.2       |          | 
| 38 | View Questions, Sort by Unanswered              | Test-5.3       |          | 
| 39 | Guest Accessing Application                     | Test-6.0       |          | 
| 40 | Guest can see questions                         | Test-6.1       |          | 
| 41 | Guest cannot access profile page                | Test-6.2       |          | 
| 42 | Guest cannot ask a question                     | Test-6.3       |          | 
| 43 | Guest cannot answer a question                  | Test-6.4       |          | 
| 44 | Guest cannot comment                            | Test-6.5       |          | 
| 45 | Guest cannot vote                               | Test-6.6       |          | 
| 46 | Create comment for question                     | Test-7.0       |          | 
| 47 | Create comment for answer                       | Test-7.1       |          | 
| 48 | Create multiple comments for question, paginate | Test-7.2       |          | 
| 49 | Create multiple comments for answer, paginate   | Test-7.3       |          | 

## Design Patterns Used

- Design Pattern Name:

- Problem Solved:

- Location in code where pattern is used:

## Instructions to run:

Run Mongod:

    brew services start mongodb-community@7.0

Run Server:

    SERVER_SECRET=webdev nodemon server.js

Run Client:

    npm start

Run Tests:

    npx cypress open