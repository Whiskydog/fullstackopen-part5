import user from '../fixtures/user.json';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Please log in');
    cy.contains('username');
    cy.contains('password');
    cy.get('input[name=username]');
    cy.get('input[name=password]');
    cy.contains('button', 'login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=password]').type(user.password);
      cy.contains('button', 'login').click();
      cy.contains(`${user.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=password]').type('wrongpassword');
      cy.contains('button', 'login').click();
      cy.contains('Wrong username or password').and(
        'have.css',
        'color',
        'rgb(151, 16, 18)'
      );
    });
  });
});
