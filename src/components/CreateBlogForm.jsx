import { useState } from 'react';

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    document.activeElement && document.activeElement.blur();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            Title:
            <input
              id="blog-input-title"
              type="text"
              name="title"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              id="blog-input-author"
              type="text"
              name="author"
              required
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              id="blog-input-url"
              type="text"
              name="url"
              required
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
