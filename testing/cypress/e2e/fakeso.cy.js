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
    it('successfully shows page title', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Fake Stack Overflow');
    })
    it('successfully shows page greeting', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome, Please Select a Method to Proceed');
    })
    it('successfully shows log in button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In');
    })
    it('successfully shows register button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register');
    })
    it('successfully shows guest button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest');
    })
    it('successfully navigate to register page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
    })
    it('successfully shows log in button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Log In');
    })
    it('successfully shows register button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register');
    })
    it('successfully shows guest button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Proceed as Guest');
    })
    it('successfully create a user and login and see home page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Register').click();
        cy.get('#usernameInput').type('someone')
        cy.get('#emailInput').type('someone@gmail.com')
        cy.get('#passwordInput').type('Password_123')
        cy.get('#confirmPasswordInput').type('Password_123')
        cy.get('#registerSubmit').click();

        cy.visit('http://localhost:3000');
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
    it('successfully create a user and login and answer a question', () => {
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

    })
    it('successfully create a user and login and open ask question', () => {
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

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Unit Test Question Title');
        cy.get('#formTextInput').type('Unit Test Question Text');
        cy.get('#formTagInput').type('relativity');
        cy.contains('Post Question').click();

        cy.contains('11 questions');

    })
    it('successfully register, login and see tags page', () => {
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

        cy.contains('Tags').click();
        cy.contains('8 Tags');
    })

    it('successfully register, login and see profile page', () => {
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

        cy.contains('Profile').click();
        cy.contains('Welcome');
        cy.contains('Days on FSO');
        cy.contains('Reputation');
    })
})





