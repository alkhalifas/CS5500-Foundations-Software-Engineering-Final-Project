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
})
//
// describe('Login Test 1', () => {
//     it('successfully shows page title', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Fake Stack Overflow');
//     })
// })
//
// describe('Login Test 2', () => {
//     it('successfully shows page greeting', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Welcome, Please Select a Method to Proceed');
//     })
// })
//
// describe('Login Test 3', () => {
//     it('successfully shows log in button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Log In');
//     })
// })
//
// describe('Login Test 4', () => {
//     it('successfully shows register button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Register');
//     })
// })
//
// describe('Login Test 5', () => {
//     it('successfully shows guest button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Proceed as Guest');
//     })
// })
//
// describe('Login Test 6', () => {
//     it('successfully navigate to register page', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Register').click();
//     })
// })
//
// describe('Register Test 1', () => {
//     it('successfully shows log in button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Log In');
//     })
// })
//
// describe('Register Test 2', () => {
//     it('successfully shows register button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Register');
//     })
// })
//
// describe('Register Test 3', () => {
//     it('successfully shows guest button', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Proceed as Guest');
//     })
// })
//
// describe('Register Test 4', () => {
//     it('successfully navigate to register page', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Register').click();
//         cy.get('#usernameInput').type('someone')
//         cy.get('#emailInput').type('someone@gmail.com')
//         cy.get('#passwordInput').type('Password_123')
//         cy.get('#confirmPasswordInput').type('Password_123')
//         cy.get('#registerSubmit').click();
//
//     })
// })
//
// describe('Login Test 6', () => {
//     it('successfully navigate to register page', () => {
//         cy.visit('http://localhost:3000');
//         cy.contains('Log In').click();
//     })
// })
//
//
