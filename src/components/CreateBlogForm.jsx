import { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const blogData = Object.fromEntries(formData.entries());

    const blog = await blogService.create(blogData);
    setBlogs((blogs) => blogs.concat(blog));

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>
          Title:
          <input
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
  );
};

export default CreateBlogForm;
