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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it('A blog can be created', function () {
      cy.contains('New blog').click();
      cy.get('#blog-input-title').type('Example blog');
      cy.get('#blog-input-author').type('Example author');
      cy.get('#blog-input-url').type('http://example.com');
      cy.contains('button', 'Create').click();
      cy.contains('A new blog Example blog added');
      cy.contains('Example blog Example author').contains('view');
    });
  });
});
