// Template test file. Change the file to add more tests.
describe('Fake SO Test Suite', () => {
    beforeEach(() => {
        // Seed the database before each test
//        cy.exec('node /path/to/server/init.js');
        cy.exec('node ../server/init.js');

    });

      afterEach(() => {
        // Clear the database after each test
//        cy.exec('node /path/to/server/destroy.js');
          cy.exec('node ../server/destroy.js');

      });

    it('1.1 | Shows page title, welcome message, login, register, and guest options', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Fake Stack Overflow');
        cy.contains('Welcome, Please Select a Method to Proceed');
        cy.contains('Log In');
        cy.contains('Register');
        cy.contains('Proceed as Guest');
    })

    it('1.2 | Navigate to register page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
    })
    it('1.3 | Navigate to log in page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Login').click();
    })
    it('1.4 | Proceed as guest', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
    })
    it('1.5 | Shows thee login options', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In');
        cy.contains('Register');
        cy.contains('Proceed as Guest');
    })
    it('1.6 | Check Class and IDs 1/2', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.get('.postTitle')
        cy.get('.postStats')
        cy.get('.lastActivity')
        cy.get('.postTitle')

        cy.contains('Question Title 10').click();
        cy.get('#questionBody').should('contain', 'views');
        cy.get('#questionBody').should('contain', 'vote');
        cy.get('#answersHeader').should('contain', '1 views');
        cy.get('#answersHeader').should('contain', '0 votes');
        cy.get('#answersHeader').should('contain', '2 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
        cy.get('#sideBarNav').should('contain', 'Profile');

    })

    it('1.7 | Check Class and IDs 2/2', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.get('#searchBar')

        cy.get('.postTitle')
        cy.get('.postStats')
        cy.get('.lastActivity')
        cy.get('.postTitle')

        cy.contains('Question Title 10').click();
        cy.get('.answerText')
        cy.get('.answerAuthor')
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput');

        cy.contains('Tags').click();
        cy.get('.tagNode')


    })

    // Section 2: Ask Question
    it('2.1 | Create a user and login and see home page and its associated items', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('someone')
        cy.get('#emailInput').type('someone@gmail.com')
        cy.get('#passwordInput').type('Password_123')
        cy.get('#confirmPasswordInput').type('Password_123')
        cy.get('#registerSubmit').click();

        cy.get('#username').type('someone')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');

        cy.contains('10 questions');
        cy.contains('Ask a Question');

        cy.contains('Questions');
        cy.contains('Profile');
        cy.contains('Tags').click();

    })

    it('2.1.1 | Register User, Existing Username', () => {

        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('nbohr');
        cy.get('#emailInput').type('new_nbohr@science.com');
        cy.get('#passwordInput').type('password123');
        cy.get('#confirmPasswordInput').type('password123');
        cy.get('#registerSubmit').click();
        cy.contains('Username already in use');
    });

    it('2.1.2 | Register User, Existing Email', () => {

        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('new_nbohr');
        cy.get('#emailInput').type('nbohr@science.com');
        cy.get('#passwordInput').type('password123');
        cy.get('#confirmPasswordInput').type('password123');
        cy.get('#registerSubmit').click();
        cy.contains('Email already in use');
    });

    it('2.1.3 | Register User, Passwords dont match', () => {

        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('new_nbohr');
        cy.get('#emailInput').type('new_nbohr@science.com');
        cy.get('#passwordInput').type('password123');
        cy.get('#confirmPasswordInput').type('password12345');
        cy.get('#registerSubmit').should('not.exist');
    });

    it('2.2 | Create a user and login and answer a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('alkhalifas')
        cy.get('#emailInput').type('alkhalifas@gmail.com')
        cy.get('#passwordInput').type('Password_123')
        cy.get('#confirmPasswordInput').type('Password_123')
        cy.get('#registerSubmit').click();

        cy.visit('http://localhost:3000');
        cy.get('#username').type('alkhalifas')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type("Unit Test Answer");
        cy.contains('Unit Test Answer')

    })

    it('2.2.1 | Register User, Login, See main page button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('alkhalifas')
        cy.get('#emailInput').type('alkhalifas@gmail.com')
        cy.get('#passwordInput').type('Password_123')
        cy.get('#confirmPasswordInput').type('Password_123')
        cy.get('#registerSubmit').click();

        cy.visit('http://localhost:3000');
        cy.get('#username').type('alkhalifas');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Questions');
        cy.contains('Tags');
        cy.contains('Profile');
        cy.contains('Ask a Question');

    })

    it('2.3 | Log in, ask a question creates and displays expected meta data', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('UNIT TEST Question Q1');
        cy.get('#formTextInput').type('UNIT TEST Question Q1 Text T1');
        cy.get('#formTagInput').type('Relativity');

        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('11 questions');
        cy.contains('wheisenberg asked 0 seconds ago');
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('have.length', 1);
        cy.contains('1 question');
    })

    it('2.3.1 | Login, Username incorrect', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('someusername')
        cy.get('#password').type('Password_321')
        cy.contains('Log In').click();
        cy.contains('Invalid username or password.');
    })

    it('2.3.2 | Login, Password incorrect', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('someusername')
        cy.get('#password').type('Password_321')
        cy.contains('Log In').click();
        cy.contains('Invalid username or password.');
    })

    it('2.3.3 | Login, Fields Missing', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password');
        cy.contains('Log In').click();
        cy.contains('Questions').should('not.exist');
    })

    it('2.4 | Logs in and asks a question with exiting tag', () => {
        cy.visit('http://localhost:3000');

        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Unit Test Question Title');
        cy.get('#formTextInput').type('Unit Test Question Text');
        cy.get('#formTagInput').type('relativity');
        cy.contains('Post Question').click();

        cy.contains('11 questions');
    })

    it('2.4.1 | Logs in and asks a question with enough rep and crates new tag', () => {
        cy.visit('http://localhost:3000');

        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Unit Test Question Title');
        cy.get('#formTextInput').type('Unit Test Question Text');
        cy.get('#formTagInput').type('Atomic');
        cy.contains('Post Question').click();

        cy.contains('11 questions');
    })

    it('2.4.2 | Logs in and asks a question with new tag without enough rep', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('eruth')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Unit Test Question Title');
        cy.get('#formTextInput').type('Unit Test Question Text');
        cy.get('#formTagInput').type('relativity');
        cy.contains('Post Question').click();

        cy.contains('Only a user with reputation of 50 or more can create a new tag');
    })
    it('2.5 | Login and see tags page', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('eruth')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Tags').click();
        cy.contains('8 Tags');
    })

    it('2.6 | Login and see profile page', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('eruth')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.contains('Welcome');
        cy.contains('Days on FSO');
        cy.contains('Reputation');
    })

    it('2.7 | Logs in, asks a Question with empty title shows error', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text Q1');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })

    it('2.7.1 | Logs in, asks a Question with empty text shows error', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1 Text Q1');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })
    it('2.7.2 | Logs in, asks a Question with empty tag shows error', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1 Text Q1');
        cy.get('#formTextInput').type('Test Question 1 Text Q1');
        cy.contains('Post Question').click();
        cy.contains('Tags cannot be empty');
    })

    // Section 3: Upvote and reputation
    it('3.0 | nbohr Logs in, checks reputation, logs out, jdalt logs in, upvotes question, logs out, nbohr Logs in, checks reputation', () => {
        cy.visit('http://localhost:3000');

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('45');
        cy.contains('Logout').click();

        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('100');

        cy.contains('Questions').click();
        cy.contains('Question Title 9').click();
        cy.contains('0 votes')
        cy.contains('Up').click();
        cy.contains('1 votes')
        cy.contains('Logout').click();

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('50');
    })

    it('3.1 | nbohr Logs in, checks reputation, logs out, jdalt logs in, downvotes question, logs out, nbohr Logs in, checks reputation', () => {
        cy.visit('http://localhost:3000');

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('45');
        cy.contains('Logout').click();

        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('100');

        cy.contains('Questions').click();
        cy.contains('Question Title 9').click();
        cy.contains('0 votes')
        cy.contains('Up').click();
        cy.contains('Down').click();
        cy.contains('0 votes')
        cy.contains('Logout').click();

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation');
        cy.contains('40');
    })
    it('3.2 | Logs in , no unanswered, and asks a question, 1 unanswered', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('10 questions')

        cy.contains('Unanswered').click();
        cy.contains('0 questions')

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('What is the uncertainty principle?');
        cy.get('#formTextInput').type('What exactly is the uncertainty principle?');
        cy.get('#formTagInput').type('uncertainty');
        cy.contains('Post Question').click();
        cy.contains('Unanswered').click();
        cy.contains('1 questions')

    })

    it('3.3 | Open a question and confirm current answers', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.get('.answerText').should('have.length', 2);
    });

    it('3.4 | Login, upvote answer and confirm', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('aeinstein')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Newest').click();
        cy.contains('Question Title 10').click();
        cy.get('#upvoteAnswer').first().click();
        cy.contains('3 votes')
    });

    it('3.5 | Login, upvote answer and confirm', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Active').click();
        cy.contains('Question Title 1').click();
        cy.get('#upvoteAnswer').first().click();
        cy.contains('3 votes')
    });

    it('3.6 | Upvote an answer and check reputation', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 9').click();
        cy.get('#upvoteAnswer').first().click();
        cy.contains('Logout').click();

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('50');
    });

    it('3.7 | Next Page Downvote an answer and check reputation', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Next').click();
        cy.contains('Question Title 1').click();
        cy.get('#downvoteAnswer').first().click();
        cy.contains('Logout').click();

        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('90');
    });

    it('5.1 | View Questions, Sort by Newest', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Newest').click();
        cy.contains('10 questions').should('exist');

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('What is Schrodingers cat?');
        cy.get('#formTextInput').type('What is Schrodingers cat?');
        cy.get('#formTagInput').type('schrodinger cat');
        cy.get('button').contains('Post Question').click();

        cy.contains('Newest').click();

        cy.contains('wheisenberg asked 0 seconds ago').should('exist');
        cy.contains('What is Schrodingers cat?').should('exist');
        cy.contains('11 questions').should('exist');

    });

    it('5.1.1 | View Questions, Sort by Unanswered', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Unanswered').click();
        cy.contains('0 questions').should('exist');

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('What is Schrodingers cat?');
        cy.get('#formTextInput').type('What is Schrodingers cat?');
        cy.get('#formTagInput').type('schrodinger cat');
        cy.get('button').contains('Post Question').click();

        cy.contains('Unanswered').click();
        cy.contains('1 questions').should('exist');

    });

    it('5.2 | View Answers to question  ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Unanswered').click();
        cy.contains('0 questions').should('exist');


        cy.contains('Newest').click();
        cy.contains('10 questions').should('exist');

        cy.contains('Question Title 10').click();
        cy.contains('2 answers').should('exist');
        cy.contains('Answer 2 for question 10').should('exist');
        cy.contains('Answer 1 for question 10').should('exist');

    });



    it('5.3 | Add Answer to Question, Success', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.contains('Answer Question').click();

        cy.get('#answerTextInput').type('This is a successful answer submission.');
        cy.get('button.submit-button').click();
        cy.contains('This is a successful answer submission.').should('exist'); // Adjust based on your success message
        cy.contains('jdalt answered 0 seconds ago').should('exist'); // Adjust based on your success message
    });

    it('5.3.1 | Add Answer to question, Missing Text', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.contains('Answer Question').click();

        cy.get('button.submit-button').click();
        cy.contains('Answer text cannot be empty')
    });

    it('5.3.2 | Add Answer to Question, Invalid Hyperlink', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.contains('Answer Question').click();

        cy.get('#answerTextInput').type('This is an answer with an invalid [link](http://invalid-link)');
        cy.get('button.submit-button').click();
        cy.contains('Invalid hyperlink constraints').should('exist'); // Adjust based on your hyperlink validation message
    });

    it('6.0 | Guest Accessing Application', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('#searchBar')
        cy.contains('All Questions')
        cy.contains('10 questions')
        cy.contains('Question Title 10')
    });

    it('6.1 | Guest can see questions', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('#searchBar')
        cy.contains('All Questions')
        cy.contains('10 questions')
        cy.contains('Question Title 10')

        cy.get('.postTitle')
        cy.get('.postStats')
        cy.get('.lastActivity')
        cy.get('.postTitle')

    });

    it('6.2 | Guest cannot see Profile button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('button').contains('Profile').should('not.exist');
    });

    it('6.3 | Guest cannot ask a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('button').contains('Ask a Question').should('not.exist');

        cy.contains('Tags').click();
        cy.contains('atom').click();
        cy.get('button').contains('Ask a Question').should('not.exist');

    });

    it('6.4 | Guest cannot answer a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('button').contains('Answer Question').should('not.exist');

        cy.contains('Tags').click();
        cy.contains('atom').click();
        cy.get('button').contains('Answer Question').should('not.exist');

    });

    it('6.5 | Guest cannot add a comment', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();

        cy.contains('Question Title 1').click();

        cy.get('button').contains('Post').should('not.exist');

    });

    it('6.6 | Guest cannot vote', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();

        cy.contains('Question Title 1').click();

        cy.get('button').contains('Up').should('not.exist');
        cy.get('button').contains('Down').should('not.exist');
        cy.get('button').contains('Down').should('not.exist');

    });

    it('7.0 | Create comment for question', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        cy.get('#commentInput').type('Redox reactions are complex{enter}')
        // cy.get('#commentSubmit').click();
        cy.contains('Redox reactions are complex');
        cy.contains('jdalt');

    });

    it('7.0.1 | Create comment for question fails low rep', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        cy.get('#commentInput').type('Redox reactions are complex{enter}')
        // cy.get('#commentSubmit').click();
        cy.contains('User does not have enough reputation');

    });

    it('7.0.2 | Create comment for question too many characters', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        cy.get('#commentInput').type('x'.repeat(138)).type('{enter}')
        // cy.get('#commentSubmit').click();

        cy.contains('x'.repeat(138));


        cy.get('#commentInput').type('y'.repeat(142)).type('{enter}')
        // cy.get('#commentSubmit').click();
        cy.contains('Comment must be less than 140 characters.');

    });

    it('7.1 | Create comment for answer', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        // Target the first '.vertical-stacking' element
        cy.get('.vertical-stacking').eq(0).within(() => {
            cy.get('#commentInput').type('Redox reactions are complex{enter}');
            // cy.get('#commentSubmit').click();
        });

        cy.contains('Redox reactions are complex');
        cy.contains('jdalt');
    });

    it('7.2 | Create multiple comments for question, paginate', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        cy.get('#commentInput').type('Test comment 1{enter}')
        // cy.get('#commentSubmit').click();

        cy.get('#commentInput').type('Test comment 2{enter}')
        // cy.get('#commentSubmit').click();

        cy.get('#commentInput').type('Test comment 3{enter}')
        // cy.get('#commentSubmit').click();


        cy.contains('Test comment 1');
        cy.contains('Test comment 2');
        cy.contains('Test comment 3');

        cy.get('#commentInput').type('Test comment 4{enter}')
        // cy.get('#commentSubmit').click();

        cy.contains('Test comment 1').should('not.exist');
        cy.contains('Test comment 2').should('exist');
        cy.contains('Test comment 3').should('exist');
        cy.contains('Test comment 4').should('exist');

    });

    it('7.3 | Create multiple comments for answer, paginate', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();

        // Target the first '.vertical-stacking' element
        cy.get('.vertical-stacking').eq(0).within(() => {
            cy.get('#commentInput').type('Test comment 1{enter}');
            // cy.get('#commentSubmit').click();
            cy.get('#commentInput').type('Test comment 2{enter}');
            // cy.get('#commentSubmit').click();
            cy.get('#commentInput').type('Test comment 3{enter}');
            // cy.get('#commentSubmit').click();
            cy.get('#commentInput').type('Test comment 4{enter}');
            // cy.get('#commentSubmit').click();

            cy.contains('Test comment 1').should('not.exist');
            cy.contains('Test comment 2').should('exist');
            cy.contains('Test comment 3').should('exist');
            cy.contains('Test comment 4').should('exist');

            cy.get('button').contains('Prev').should('be.disabled');
            cy.get('button').contains('Next').click();
            cy.contains('Test comment 1').should('exist');

        });
        cy.contains('jdalt');
    });

    it('8.0 | Tags render correctly   ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('8 Tags');

        cy.get('.tagNode').contains('atom').parents('.tagNode').contains('3 questions');


    });

    it('8.1 | Tags render correctly   ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('8 Tags');

        cy.get('.tagNode').contains('atom').click();

        cy.contains('3 questions').should('exist');

        cy.contains('Tags').click();
        cy.contains('Ask a Question').click();

        cy.get('#formTitleInput').type('What is Heisenberg known for?');
        cy.get('#formTextInput').type('The Uncertainty Principle');
        cy.get('#formTagInput').type('Uncertainty');
        cy.contains('Post Question').click();

        cy.contains('Tags').click();
        cy.contains('9 Tags');
        cy.contains('uncertainty');

    });

    it('8.2 | Tags Click Shows Questions ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Tags').click();
        cy.contains('All Tags');
        cy.contains('8 Tags');

        cy.get('.tagNode').contains('atom').parents('.tagNode').contains('3 questions');

        cy.contains('atom').click();
        cy.contains('3 questions').should('exist');

    });


    it('9.0 | Login and Logout', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();
        cy.contains('Question Title 1').click();
        cy.contains('Logout').click();
    });

    it('9.1 | Authentication Logout then try to ask question', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();
        cy.get('button').contains('Ask a Question').should('exist');
        cy.contains('Question Title 1').click();
        cy.contains('Logout').click();

        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('button').contains('Ask a Question').should('not.exist');
    });

    it('9.2 | Authentication Logout then try to see profile', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();
        cy.contains('Question Title 1').click();
        cy.contains('Logout').click();

        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('button').contains('Profile').should('not.exist');
    });

    it('10.0 | Profile See Content ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('#fso-days-val').should('be.visible');
        cy.get('#fso-days-text').contains('Days on FSO').should('be.visible');

        cy.get('#fso-rep-val').should('be.visible');
        cy.get('#fso-rep-text').contains('Reputation Points').should('be.visible');

        cy.contains('2 Questions')

        cy.get('button').contains('Questions').should('exist');
        cy.get('button').contains('Tags').should('exist');
        cy.get('button').contains('Answers').should('exist');

    });

    it('10.1 | Profile, See Reputation and Days on FSO', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('#fso-days-val').should('be.visible');
        cy.get('#fso-days-text').contains('Days on FSO').should('be.visible');

        cy.get('#fso-rep-val').should('be.visible');
        cy.get('#fso-rep-text').contains('Reputation Points').should('be.visible');
    });


    it('10.2 | Profile, See Questions, Tags, Answers', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('#fso-days-val').should('be.visible');
        cy.get('#fso-days-text').contains('Days on FSO').should('be.visible');

        cy.get('#fso-rep-val').should('be.visible');
        cy.get('#fso-rep-text').contains('Reputation Points').should('be.visible');

        cy.contains('2 Questions')

        cy.get('.profile-container').contains('Questions').click();
        cy.contains('2 Questions')
        cy.contains('Question Title 8')
        cy.contains('Question Title 1').click()
        cy.get('button').contains('Save')
        cy.get('button').contains('Delete')

        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('What is bubble sort?');
        cy.get('#formTextInput').type('What exactly is bubble sort?');
        cy.get('#formTagInput').type('sorting');
        cy.contains('Post Question').click();


        cy.contains('Profile').click();
        cy.get('.profile-container').contains('Tags').click();
        cy.contains('sorting')

        cy.get('.profile-container').contains('Answers').click();
        cy.contains('Answer 1 for question 8');
        cy.contains('Answer 2 for question 8');
        cy.contains('Answer 2 for question 1');
        cy.contains('Answer 1 for question 1').click();
        cy.get('button').contains('Save')
        cy.get('button').contains('Delete')
    });

    it('10.3 | Profile, See Questions, Tags, Answers', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('.profile-container').contains('Questions').click();
        cy.contains('2 Questions')
        cy.contains('Question Title 1').click()

        cy.get('#formTitleInput').type('01');
        cy.get('#formTextInput').type('01');
        cy.get('#formTagInput').type(' 101');

        cy.get('button').contains('Save').click()

        cy.contains('Question Title 101').click()

        cy.get('#formTitleInput').should('have.value', 'Question Title 101');
        cy.get('#formTextInput').should('have.value', 'Question Text 101');
        cy.get('#formTagInput').should('have.value', 'quantum relativity 101');

    });


    it('10.4 | Edit Answer and see Changes ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('.profile-container').contains('Answers').click();
        cy.contains('4 Answers')
        cy.contains('Answer 1 for question 8').click()

        cy.get('#answerTextInput').type('8');

        cy.get('button').contains('Save').click()

        cy.contains('Answer 1 for question 88').click()

        cy.get('#answerTextInput').should('have.value', 'Answer 1 for question 88');

    });

    it('10.5 | Edit Tag and see Changes ', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('What is bubble sort?');
        cy.get('#formTextInput').type('What exactly is bubble sort?');
        cy.get('#formTagInput').type('sort');
        cy.contains('Post Question').click();

        cy.contains('Profile').click();
        cy.get('.profile-container').contains('Tags').click();
        cy.contains('1 Tags')
        cy.get('button').contains('Edit').click()

        cy.get('#tagInputField').type('ing');

        cy.get('button').contains('Save').click()

        cy.contains('sorting')
        cy.get('button').contains('Tags').click();
        cy.contains('sorting')


    });


    it('11.0 | Security, User can only get their data', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();

        cy.contains('Profile').click();
        cy.get('#fso-days-val').should('be.visible');
        cy.get('#fso-days-text').contains('Days on FSO').should('be.visible');

        cy.get('#fso-rep-val').should('be.visible');
        cy.get('#fso-rep-text').contains('Reputation Points').should('be.visible');

        cy.contains('wheisenberg')
        cy.contains('nbohr').should('not.exist');
        cy.contains('aeinstein').should('not.exist');
        cy.contains('eschrod').should('not.exist');

    });

    it('11.2 | Security, User can only get their data', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();
        cy.contains('Profile').click();

        cy.visit('http://localhost:3000');

        cy.contains('Profile').click();

        cy.get('#fso-days-val').should('be.visible');
        cy.get('#fso-days-text').contains('Days on FSO').should('be.visible');

        cy.get('#fso-rep-val').should('be.visible');
        cy.get('#fso-rep-text').contains('Reputation Points').should('be.visible');


        cy.contains('wheisenberg')
        cy.contains('nbohr').should('not.exist');
        cy.contains('aeinstein').should('not.exist');
        cy.contains('eschrod').should('not.exist');

    });

    it('11.3 | Security, Unsecure URLs are managed correctly', () => {

        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('UNIT TEST Question BAD');
        cy.get('#formTextInput').type('Bad URL:  [LINK](http//:www.google.com)');
        cy.get('#formTagInput').type('bad');
        cy.get('button').contains('Post Question').click();
        cy.contains('Invalid hyperlink');

        cy.contains('Questions').click();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('UNIT TEST Question BAD');
        cy.get('#formTextInput').type('Bad URL:  [LINK](https//:www.google.com)');
        cy.get('#formTagInput').type('bad');
        cy.get('button').contains('Post Question').click();
        cy.contains('Invalid hyperlink');

        cy.contains('Questions').click();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('UNIT TEST Question BAD');
        cy.get('#formTextInput').type('bad one:  [LINK](http://www.google.com)');
        cy.get('#formTagInput').type('bad');
        cy.get('button').contains('Post Question').click();
        cy.contains('Invalid hyperlink');

        cy.contains('Questions').click();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('UNIT TEST Question GOOD');
        cy.get('#formTextInput').type('bad one:  [LINK](https://www.google.com)');
        cy.get('#formTagInput').type('bad');
        cy.get('button').contains('Post Question').click();
        cy.contains('UNIT TEST Question GOOD').should('be.visible');
        cy.contains('bad one: LINK').should('be.visible');

    })

})