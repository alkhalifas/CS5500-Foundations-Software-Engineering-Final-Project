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

    // Section 1: Welcome
    // it('1.1 | Shows page title, welcome message, login, register, and guest options', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Fake Stack Overflow');
    //     cy.contains('Welcome, Please Select a Method to Proceed');
    //     cy.contains('Log In');
    //     cy.contains('Register');
    //     cy.contains('Proceed as Guest');
    // })
    //
    // it('1.2 | Navigate to register page', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Register').click();
    // })
    // it('1.3 | Navigate to log in page', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Login').click();
    // })
    // it('1.4 | Proceed as guest', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Proceed as Guest').click();
    // })
    // it('1.5 | Shows thee login options', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Log In');
    //     cy.contains('Register');
    //     cy.contains('Proceed as Guest');
    // })
    // it('1.6 | Check Class and IDs 1/2', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.get('.postTitle')
    //     cy.get('.postStats')
    //     cy.get('.lastActivity')
    //     cy.get('.postTitle')
    //
    //     cy.contains('Question Title 10').click();
    //     cy.get('#questionBody').should('contain', 'views');
    //     cy.get('#questionBody').should('contain', 'vote');
    //     cy.get('#answersHeader').should('contain', '1 views');
    //     cy.get('#answersHeader').should('contain', '0 votes');
    //     cy.get('#answersHeader').should('contain', '2 answers');
    //     cy.get('#answersHeader').should('contain', 'Ask a Question');
    //     cy.get('#sideBarNav').should('contain', 'Questions');
    //     cy.get('#sideBarNav').should('contain', 'Tags');
    //     cy.get('#sideBarNav').should('contain', 'Profile');
    //
    // })
    //
    // it('1.7 | Check Class and IDs 2/2', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.get('#searchBar')
    //
    //     cy.get('.postTitle')
    //     cy.get('.postStats')
    //     cy.get('.lastActivity')
    //     cy.get('.postTitle')
    //
    //     cy.contains('Question Title 10').click();
    //     cy.get('.answerText')
    //     cy.get('.answerAuthor')
    //     cy.contains('Answer Question').click();
    //     cy.get('#answerTextInput');
    //
    //     cy.contains('Tags').click();
    //     cy.get('.tagNode')
    //
    //
    // })
    //
    // // Section 2: Ask Question
    // it('2.1 | Create a user and login and see home page and its associated items', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Register').click();
    //     cy.get('#usernameInput').type('someone')
    //     cy.get('#emailInput').type('someone@gmail.com')
    //     cy.get('#passwordInput').type('Password_123')
    //     cy.get('#confirmPasswordInput').type('Password_123')
    //     cy.get('#registerSubmit').click();
    //
    //     cy.get('#username').type('someone')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Newest');
    //     cy.contains('Active');
    //     cy.contains('Unanswered');
    //
    //     cy.contains('10 questions');
    //     cy.contains('Ask a Question');
    //
    //     cy.contains('Questions');
    //     cy.contains('Profile');
    //     cy.contains('Tags').click();
    //
    // })
    // it('2.2 | Create a user and login and answer a question', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Register').click();
    //     cy.get('#usernameInput').type('alkhalifas')
    //     cy.get('#emailInput').type('alkhalifas@gmail.com')
    //     cy.get('#passwordInput').type('Password_123')
    //     cy.get('#confirmPasswordInput').type('Password_123')
    //     cy.get('#registerSubmit').click();
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('alkhalifas')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Question Title 10').click();
    //     cy.contains('Answer Question').click();
    //     cy.get('#answerTextInput').type("Unit Test Answer");
    //     cy.contains('Unit Test Answer')
    //
    // })
    //
    // it('2.3 | Log in, ask a question creates and displays expected meta data', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('UNIT TEST Question Q1');
    //     cy.get('#formTextInput').type('UNIT TEST Question Q1 Text T1');
    //     cy.get('#formTagInput').type('Relativity');
    //
    //     cy.contains('Post Question').click();
    //     cy.contains('Fake Stack Overflow');
    //     cy.contains('11 questions');
    //     cy.contains('wheisenberg asked 0 seconds ago');
    //     cy.contains('Unanswered').click();
    //     cy.get('.postTitle').should('have.length', 1);
    //     cy.contains('1 question');
    // })
    //
    // it('2.4 | Logs in and asks a question with exiting tag', () => {
    //     cy.visit('http://localhost:3000');
    //
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Unit Test Question Title');
    //     cy.get('#formTextInput').type('Unit Test Question Text');
    //     cy.get('#formTagInput').type('relativity');
    //     cy.contains('Post Question').click();
    //
    //     cy.contains('11 questions');
    // })
    //
    // it('2.4.1 | Logs in and asks a question with enough rep and crates new tag', () => {
    //     cy.visit('http://localhost:3000');
    //
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Unit Test Question Title');
    //     cy.get('#formTextInput').type('Unit Test Question Text');
    //     cy.get('#formTagInput').type('Atomic');
    //     cy.contains('Post Question').click();
    //
    //     cy.contains('11 questions');
    // })
    //
    // it('2.4.2 | Logs in and asks a question with new tag without enough rep', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('eruth')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Unit Test Question Title');
    //     cy.get('#formTextInput').type('Unit Test Question Text');
    //     cy.get('#formTagInput').type('relativity');
    //     cy.contains('Post Question').click();
    //
    //     cy.contains('Only a user with reputation of 50 or more can create a new tag');
    // })
    // it('2.5 | Login and see tags page', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('eruth')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Tags').click();
    //     cy.contains('8 Tags');
    // })
    //
    // it('2.6 | Login and see profile page', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('eruth')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Profile').click();
    //     cy.contains('Welcome');
    //     cy.contains('Days on FSO');
    //     cy.contains('Reputation');
    // })
    //
    // it('2.7 | Logs in, asks a Question with empty title shows error', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('jdalt')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTextInput').type('Test Question 1 Text Q1');
    //     cy.get('#formTagInput').type('javascript');
    //     cy.contains('Post Question').click();
    //     cy.contains('Title cannot be empty');
    // })
    //
    // it('2.7.1 | Logs in, asks a Question with empty text shows error', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('jdalt')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Test Question 1 Text Q1');
    //     cy.get('#formTagInput').type('javascript');
    //     cy.contains('Post Question').click();
    //     cy.contains('Question text cannot be empty');
    // })
    // it('2.7.2 | Logs in, asks a Question with empty tag shows error', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('jdalt')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Test Question 1 Text Q1');
    //     cy.get('#formTextInput').type('Test Question 1 Text Q1');
    //     cy.contains('Post Question').click();
    //     cy.contains('Tags cannot be empty');
    // })
    //
    // // Section 3: Upvote and reputation
    // it('3.0 | nbohr Logs in, checks reputation, logs out, jdalt logs in, upvotes question, logs out, nbohr Logs in, checks reputation', () => {
    //     cy.visit('http://localhost:3000');
    //
    //     cy.get('#username').type('nbohr')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('45');
    //     cy.contains('Logout').click();
    //
    //     cy.get('#username').type('jdalt')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('100');
    //
    //     cy.contains('Questions').click();
    //     cy.contains('Question Title 9').click();
    //     cy.contains('0 votes')
    //     cy.contains('Up').click();
    //     cy.contains('1 votes')
    //     cy.contains('Logout').click();
    //
    //     cy.get('#username').type('nbohr')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('50');
    // })
    //
    // it('3.1 | nbohr Logs in, checks reputation, logs out, jdalt logs in, downvotes question, logs out, nbohr Logs in, checks reputation', () => {
    //     cy.visit('http://localhost:3000');
    //
    //     cy.get('#username').type('nbohr')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('45');
    //     cy.contains('Logout').click();
    //
    //     cy.get('#username').type('jdalt')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('100');
    //
    //     cy.contains('Questions').click();
    //     cy.contains('Question Title 9').click();
    //     cy.contains('0 votes')
    //     cy.contains('Up').click();
    //     cy.contains('Down').click();
    //     cy.contains('0 votes')
    //     cy.contains('Logout').click();
    //
    //     cy.get('#username').type('nbohr')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('Profile').click();
    //     cy.contains('Reputation');
    //     cy.contains('40');
    // })
    // it('3.2 | Logs in , no unanswered, and asks a question, 1 unanswered', () => {
    //
    //     cy.visit('http://localhost:3000');
    //     cy.get('#username').type('wheisenberg')
    //     cy.get('#password').type('Password_123')
    //     cy.contains('Log In').click();
    //     cy.contains('10 questions')
    //
    //     cy.contains('Unanswered').click();
    //     cy.contains('0 questions')
    //
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('What is the uncertainty principle?');
    //     cy.get('#formTextInput').type('What exactly is the uncertainty principle?');
    //     cy.get('#formTagInput').type('uncertainty');
    //     cy.contains('Post Question').click();
    //     cy.contains('Unanswered').click();
    //     cy.contains('1 questions')
    //
    // })

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
        cy.get('#answerVotes').first().should('contain', '3');
    });

    it('3.5 | Login, upvote answer and confirm', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Active').click();
        cy.contains('Question Title 1').click();
        cy.get('.upvoteAnswer').first().click();
        cy.get('.answerVotes').first().should('contain', '1');
    });

    it('3.6 | Upvote an answer and check reputation', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 1').click();
        cy.get('.upvoteAnswer').first().click();
        cy.contains('Logout').click();

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation').should('contain', '46'); // Assuming starting reputation was 45
    });

    it('3.7 | Downvote an answer and check reputation', () => {
        // Assuming 'jdalt' downvotes an answer by 'nbohr'
        cy.visit('http://localhost:3000');
        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 1').click();
        cy.get('.downvoteAnswer').first().click();
        cy.contains('Logout').click();

        cy.get('#username').type('nbohr')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();
        cy.contains('Profile').click();
        cy.contains('Reputation').should('contain', '44'); // Assuming starting reputation was 45
    });
    it('4.0 | Search tags and check responses', () => {
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('Quantum');
        cy.contains('Search').click();
        cy.get('.postTitle').should('contain', 'Quantum');
    });

    it('4.1 | Search text and check responses', () => {
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('Uncertainty Principle');
        cy.contains('Search').click();
        cy.get('.postTitle').should('contain', 'Uncertainty Principle');
    });

    it('4.2 | Search tags and text, check responses', () => {
        cy.visit('http://localhost:3000');
        cy.get('#searchBar').type('Quantum Mechanics Uncertainty');
        cy.contains('Search').click();
        cy.get('.postTitle').should('contain', 'Quantum Mechanics');
        cy.get('.postTitle').should('contain', 'Uncertainty');
    });

    it('5.1 | View questions sorted by newest', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Newest').click();
        cy.get('.postTitle').first().should('contain', 'Most Recent Question Title');
    });

    it('5.2 | View questions sorted by active', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Active').click();
        cy.get('.postTitle').first().should('contain', 'Most Recently Active Question Title');
    });

    it('5.3 | View questions sorted by unanswered', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('not.have.class', 'answered');
    });

    it('6.0 | Guest accessing application', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.url().should('include', '/guest');
    });

    it('6.1 | Guest can see questions', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.get('.postTitle').should('have.length.at.least', 1);
    });

    it('6.2 | Guest cannot access profile page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.contains('Profile').click();
        cy.contains('Please login to access this page');
    });

    it('6.3 | Guest cannot ask a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.contains('Ask a Question').should('not.exist');
    });

    it('6.4 | Guest cannot answer a question', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.contains('Question Title 1').click();
        cy.contains('Answer Question').should('not.exist');
    });

    it('6.5 | Guest cannot comment', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.contains('Question Title 1').click();
        cy.get('.commentSection').should('not.exist');
    });

    it('6.6 | Guest cannot vote', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest').click();
        cy.contains('Question Title 1').click();
        cy.get('.upvoteButton').should('not.exist');
        cy.get('.downvoteButton').should('not.exist');
    });

    it('7.0 | Create a comment for a question', () => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('wheisenberg');
        cy.get('#password').type('Password_123');
        cy.contains('Log In').click();
        cy.contains('Question Title 1').click();
        cy.get('#commentInput').type('This is a test comment for a question.');
        cy.contains('Add Comment').click();
        cy.get('.commentText').should('contain', 'This is a test comment for a question.');
    });


})





