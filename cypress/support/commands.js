Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
    cy.visit('');
  });
});

Cypress.Commands.add('postBlog', (blog) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  cy.visit('');
});
