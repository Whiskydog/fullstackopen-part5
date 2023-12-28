import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

test('submitting a form calls the handler with proper arguments', async () => {
  const title =
    'Session-Based vs. Token-Based Authentication: Which is better?';
  const author = 'Fidal Mathew';
  const url =
    'https://dev.to/fidalmathew/session-based-vs-token-based-authentication-which-is-better-227o';

  const mockHandler = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<CreateBlogForm createBlog={mockHandler} />);

  await user.type(container.querySelector('#blog-input-title'), title);
  await user.type(container.querySelector('#blog-input-author'), author);
  await user.type(container.querySelector('#blog-input-url'), url);
  await user.click(container.querySelector('button'));

  expect(mockHandler.mock.calls).toHaveLength(1);

  const mockCall = mockHandler.mock.calls[0];
  expect(mockCall).toHaveLength(1);

  const mockCallArgument = mockCall[0];
  expect(mockCallArgument.title).toEqual(title);
  expect(mockCallArgument.author).toEqual(author);
  expect(mockCallArgument.url).toEqual(url);
});
