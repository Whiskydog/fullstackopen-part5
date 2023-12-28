describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
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
});
