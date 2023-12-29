import users from '../fixtures/users.json';
import blogs from '../fixtures/blogs.json';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    users.forEach((user) =>
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    );
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
    const user = users[0];

    it('Succeeds with correct credentials', function () {
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=password]').type(user.password);
      cy.contains('button', 'login').click();
      cy.contains(`${user.name} logged in`);
    });

    it('Fails with wrong credentials', function () {
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
      const user = users[0];
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

    describe('And a blog exists', function () {
      beforeEach(function () {
        blogs.forEach((blog) => cy.postBlog(blog));
      });

      it('Users can like blogs', function () {
        cy.contains('React patterns').parent().as('blog');
        cy.get('@blog').contains('button', 'view').click();
        cy.get('@blog').contains('likes 0');
        cy.get('@blog').contains('button', 'like').click();
        cy.get('@blog').contains('likes 1');
      });

      it('The user who created a blog can delete it', function () {
        cy.contains('React patterns').parent().as('blog');
        cy.get('@blog').contains('button', 'view').click();
        cy.get('@blog').contains('button', 'remove').click();
        cy.contains('React patterns').should('not.exist');
      });

      it('Only the user who created a blog can see the delete button', function () {
        cy.contains('button', 'logout').click();
        const userNotCreator = users[1];
        cy.login(userNotCreator.username, userNotCreator.password);

        cy.contains('React patterns').parent().as('blog');
        cy.get('@blog').contains('button', 'view').click();
        cy.get('@blog').should('not.contain', 'button', 'remove');
      });

      it('Blogs are displayed by likes in descending order', function () {
        // Ensure last blog contains certain text
        cy.get('.blog')
          .eq(2)
          .contains('Canonical string reduction Edsger W. Dijkstra');

        // We give a like to that blog
        cy.get('.blog').eq(2).contains('button', 'view').click();
        cy.get('.blog').eq(2).contains('button', 'like').click();

        // Ensure that blog is now first on the list (all other blogs have 0 likes)
        cy.get('.blog')
          .eq(0)
          .contains('Canonical string reduction Edsger W. Dijkstra');
      });
    });
  });
});
