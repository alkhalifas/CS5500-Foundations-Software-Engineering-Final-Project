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

    // // Section 1: Main page
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
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('UNIT TEST Question Q1');
    //     cy.get('#formTextInput').type('UNIT TEST Question Q1 Text T1');
    //     cy.get('#formTagInput').type('Relativity');
    //
    //     cy.contains('Post Question').click();
    //     cy.contains('Fake Stack Overflow');
    //     cy.contains('11 Questions');
    //     cy.contains('alkhalifas asked 0 seconds ago');
    //     const answers = ['0 answers', '1 answers','2 answers', '3 answers', '2 answers'];
    //     const views = ['0 views', '103 views', '200 views', '121 views','10 views'];
    //     cy.get('.postStats').each(($el, index, $list) => {
    //         cy.wrap($el).should('contain', answers[index]);
    //         cy.wrap($el).should('contain', views[index]);
    //     });
    //     cy.contains('Unanswered').click();
    //     cy.get('.postTitle').should('have.length', 1);
    //     cy.contains('1 question');
    // })
    //
    // it('2.4 | Creates a user and logs in and asks a question with exiting tag', () => {
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
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Unit Test Question Title');
    //     cy.get('#formTextInput').type('Unit Test Question Text');
    //     cy.get('#formTagInput').type('relativity');
    //     cy.contains('Post Question').click();
    //
    //     cy.contains('11 questions');
    // })
    // it('2.5 | Creates a user and logs in and asks a question with new tag without enough rep', () => {
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
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Unit Test Question Title');
    //     cy.get('#formTextInput').type('Unit Test Question Text');
    //     cy.get('#formTagInput').type('relativity');
    //     cy.contains('Post Question').click();
    //
    //     cy.contains('Only a user with reputation of 50 or more can create a new tag');
    // })
    // it('2.6 | register, login and see tags page', () => {
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
    //     cy.contains('Tags').click();
    //     cy.contains('8 Tags');
    // })
    //
    // it('2.7 | register, login and see profile page', () => {
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
    //     cy.contains('Profile').click();
    //     cy.contains('Welcome');
    //     cy.contains('Days on FSO');
    //     cy.contains('Reputation');
    // })
    //
    // it('2.8 | Registers, logs in, asks a Question with empty title shows error', () => {
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
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTextInput').type('Test Question 1 Text Q1');
    //     cy.get('#formTagInput').type('javascript');
    //     cy.contains('Post Question').click();
    //     cy.contains('Title cannot be empty');
    // })
    //
    // it('2.9 | Registers, logs in, asks a Question with empty text shows error', () => {
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
    //     cy.contains('Ask a Question').click();
    //     cy.get('#formTitleInput').type('Test Question 1 Text Q1');
    //     cy.get('#formTagInput').type('javascript');
    //     cy.contains('Post Question').click();
    //     cy.contains('Question text cannot be empty');
    // })

    // Section 3: Upvote
    it('3.0 | Logs in, upvotes another users question and answer', () => {
        cy.visit('http://localhost:3000');

        cy.get('#username').type('jdalt')
        cy.get('#password').type('Password_123')
        cy.contains('Log In').click();

        cy.contains('Question Title 10').click();
        cy.contains('Question Title 10')
        cy.get('#formTitleInput').type('Test Question 1 Text Q1');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })

})





