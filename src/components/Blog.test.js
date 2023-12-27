import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Session-Based vs. Token-Based Authentication: Which is better?',
  author: 'Fidal Mathew',
  url: 'https://dev.to/fidalmathew/session-based-vs-token-based-authentication-which-is-better-227o',
  likes: 9,
  user: {
    username: 'admin',
    name: 'Administrator',
    id: '6585601f37a19e1d51ecaaf1',
  },
  id: '658719ac396d8b0bf0fc3a7a',
};

describe('render a blog', () => {
  test('not showing details', () => {
    const { container } = render(<Blog blog={blog} />);
    const blogDiv = container.firstElementChild;

    expect(blogDiv).toHaveTextContent(blog.title);
    expect(blogDiv).toHaveTextContent(blog.author);
    expect(blogDiv).not.toHaveTextContent(blog.url);
    expect(blogDiv).not.toHaveTextContent(`likes ${blog.likes}`);
  });
});
