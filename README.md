[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in *images/*

## Instructions to setup and run project

Detailed instructions with all relevant commands go here.

## Team Member 1 Contribution -  Saleh
- [X] Create Account
- [X] Welcome Page
- [X] Login
- [X] Logout
- [X] Server Routes + Schemas
- [X] All Tags
- [X] Comments
- [ ] Testing

## Team Member 2 Contribution - Vidhi
- [X] Homepage
- [X] New Question
- [X] Searching
- [X] New Answer
- [X] Answers
- [X] User Profile
- [ ] Active Filter

## Test cases

| #  | Use-case Name                                       | Test case Name | Status   |
|----|-----------------------------------------------------|----------------|----------|
| 1  | Welcome Page Content Check                          | Test-1.1       | Passing  |
| 2  | Register Page Content Check                         | Test-1.2       | Passing  |
| 3  | Login page navigate to                              | Test-1.3       | Passing  |
| 4  | Proceed as Guest navigate to                        | Test-1.4       | Passing  |
| 5  | Welcome Page navigate to                            | Test-1.5       | Passing  |
| 6  | Confirm Class and IDs 1/2                           | Test-1.6       | Passing  |
| 7  | Confirm Class and IDs 2/2                           | Test-1.7       | Passing  |
| 8  | Register User, Success                              | Test-2.1       | Passing  |
| 9  | Register User, Existing Username                    | Test-2.1.1     | Passing  |
| 10 | Register User, Existing Email                       | Test-2.1.2     | Passing  |
| 11 | Register User, Passwords dont match                 | Test-2.1.3     | Passing  |
| 12 | Register User, Add Answer                           | Test-2.2       | Passing  |
| 13 | Register User, Login, See all buttons               | Test-2.2.1     | Passing  |
| 14 | Login, Success                                      | Test-2.3       | Passing  |
| 15 | Login, Username incorrect                           | Test-2.3.1     | Passing  |
| 16 | Login, Password incorrect                           | Test-2.3.2     | Passing  |
| 17 | Login, Fields Missing                               | Test-2.3.3     | Passing  |
| 18 | Login, Ask Question with Existing Tag               | Test-2.4       | Passing  |
| 19 | Login, Ask Question with New Tag, High Rep          | Test-2.4.1     | Passing  |
| 20 | Login, Ask Question with New Tag, Low Rep           | Test-2.4.2     | Passing  |
| 21 | See Tags Page                                       | Test-2.5       | Passing  |
| 22 | Profile Page                                        | Test-2.6       | Passing  |
| 23 | Ask Question Empty Title Error                      | Test-2.7       | Passing  |
| 24 | Ask Question Empty Text Error                       | Test-2.7.1     | Passing  |
| 25 | Ask Question Empty Tag Error                        | Test-2.7.2     | Passing  |
| 26 | Upvote Question, Reputation Check                   | Test-3.0       | Passing  |
| 27 | Downvote Question, Reputation Check                 | Test-3.1       | Passing  |
| 28 | Filter Unanswesred, Ask Question, Confirm           | Test-3.2       | Passing  |
| 29 | Open Question, Confirm Current Answers              | Test-3.3       | Passing  | 
| 30 | Login, Filter Newest, Upvote Answer, Confirm        | Test-3.4       | Passing  | 
| 31 | Login, Filter Active, Upvote Answer, Confirm        | Test-3.5       | Passing  | 
| 32 | Upvote Answer, Reputation Check                     | Test-3.6       | Passing  | 
| 33 | Downvote Answer, Reputation Check                   | Test-3.7       | Passing  | 
| 34 | Search Tags, Check Responses                        | Test-4.0       |          | 
| 35 | Search Text, Check Responses                        | Test-4.1       |          | 
| 36 | Search Tags and Text, Check Responses               | Test-4.2       |          | 
| 37 | Search Tags and Text, No results found              | Test-4.2       |          | 
| 38 | View Questions, Sort by Newest                      | Test-5.1       | Passing  | 
| 39 | View Questions, Sort by Active                      | Test-5.1.1     |          | 
| 40 | View Questions, Sort by Unanswered                  | Test-5.1.2     | Passing  | 
| 41 | View Answers to question                            | Test-5.2       | Passing  | 
| 42 | Add Answer to question, Success                     | Test-5.3       | Passing  | 
| 43 | Add Answer to question, Missing Text                | Test-5.3.1     | Passing  | 
| 44 | Add Answer to Question, Invalid Hyperlink           | Test-5.3.2     | Passing  | 
| 45 | Guest Accessing Application                         | Test-6.0       | Passing  | 
| 46 | Guest can see questions                             | Test-6.1       | Passing  | 
| 47 | Guest cannot access profile page                    | Test-6.2       | Passing  | 
| 48 | Guest cannot ask a question                         | Test-6.3       | Passing  | 
| 49 | Guest cannot answer a question                      | Test-6.4       | Passing  | 
| 50 | Guest cannot comment                                | Test-6.5       | Passing  | 
| 51 | Guest cannot vote                                   | Test-6.6       | Passing  | 
| 52 | Create comment for question                         | Test-7.0       | Passing  | 
| 53 | Create comment for question fails low rep           | Test-7.0.1     | Passing  | 
| 54 | Create comment for answer                           | Test-7.1       | Passing  | 
| 55 | Create multiple comments for question, paginate     | Test-7.2       | Passing  | 
| 56 | Create multiple comments for answer, paginate       | Test-7.3       | Passing  | 
| 57 | Tags render correctly, correct count                | Test-8.0       | Passing  | 
| 58 | Tags Correct Count after adding question            | Test-8.1       | Passing  | 
| 59 | Tags Click Shows Questions                          | Test-8.2       | Passing  | 
| 60 | Authentication Logout                               | Test-9.0       | Passing  | 
| 61 | Authentication Logout then try to ask question      | Test-9.1       | Passing  | 
| 62 | Authentication Logout then try to see profile       | Test-9.2       | Passing  | 
| 63 | Profile See Content                                 | Test-10.0      | Passing  | 
| 64 | Profile, See Reputation and Days on FSO             | Test-10.1      | Passing  | 
| 65 | Profile, See Questions, Tags, Answers               | Test-10.2      | Passing  | 
| 66 | Profile, Edit Question and see Changes              | Test-10.3      | Passing  | 
| 67 | Profile, Edit Answer and see Changes                | Test-10.4      | Passing  | 
| 68 | Profile, Edit Tag and see Changes                   | Test-10.5      |          | 
| 69 | Profile, Delete Question and see Changes            | Test-10.6      |          | 
| 70 | Profile, Delete Answer and see Changes              | Test-10.7      |          | 
| 71 | Profile, Delete Tag and see Changes                 | Test-10.8      |          | 
| 72 | Security, User can only get their data              | Test-11.0      | Passing  | 
| 72 | Security, Editing questions, answers, or tags       | Test-11.1      |          | 
| 72 | Security, Session Persisting on refresh             | Test-11.2      | Passing  | 
| 72 | Security, Unsecure URLs are managed correctly       | Test-11.3      | Passing  | 
| 72 | Security, Code injection in text is managed         | Test-11.4      |          | 
| 72 | Security, Guest cannot access user data             | Test-11.5      | Passing  | 
| 72 | Security, Guest cannot access session status        | Test-11.6      | Passing  | 


 7, 701 702, 7.1

## Design Patterns Used

#### 1. Facade Pattern:
- Design Pattern Name: Facade Pattern
- Problem Solved: The Facade Pattern in our application simplifies complex operations by providing a more direct interface. It hides the intricate underlying logic of various operations, thereby simplifying the interaction for other parts of the application. We can see examples of this in React as well as the server endpoints.
- Location in code where pattern is used: `route_questions.js`, `route_answers.js`, `AnswerCardTiming.js`, `QuestionCardTiming.js`

#### 2. Observer Pattern:
- Design Pattern Name: Facade Pattern
- Problem Solved: The Observer Pattern allows for a subscription-like mechanism where objects (observers) watch for changes in another object (subject). In the context of our FSO application, it's used for monitoring database connection states. We specifically see this for MongoDB, and can be thought of as a form of an observer pattern in the sense that our database connection maintains a list of listeners, specifically to notify of a state change.
- Location in code where pattern is used: `server.js`

#### 3. Singleton Pattern:
- Design Pattern Name: Singleton Pattern
- Problem Solved: The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. We found this pattern to be useful when exactly one object is needed to coordinate actions across the system. We specifically use the Singleton Pattern in our application with the mongoose connection. This single instance of the mongoose connection is used throughout the application to interact with the MongoDB database. By ensuring only one connection instance is created and used, the site maintains a consistent state and efficient resource usage.
- Location in code where pattern is used: `server.js`

#### 4. Factory Pattern:
- Design Pattern Name: Factory Pattern
- Problem Solved: The Factory Pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It's particularly useful when the system needs to be independent of how its objects are created. The `elementFactory` module is where the Factory Pattern is implemented. This module's `create_element` function acts as a factory, creating different elements like `Question`, `Answer`, and `Tag`. This pattern abstracts the creation logic, making the process of object instantiation more flexible and maintainable.
- Location in code where pattern is used: `elementFactory.js`,`route_questions.js`



## Instructions to run:

Run Mongod:

    brew services start mongodb-community@7.0

Run Server:

    SERVER_SECRET=webdev nodemon server.js

Run Client:

    npm start

Run Tests:

    npx cypress open
