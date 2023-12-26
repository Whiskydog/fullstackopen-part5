import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const updateBlogs = async () => setBlogs(await blogService.getAll());
    updateBlogs();
  }, []);

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem('user');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => setNotification(null), 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const createBlogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const addBlog = async (blogData) => {
    createBlogFormRef.current.toggle();
    try {
      const blog = await blogService.create(blogData);
      setBlogs(blogs.concat(blog));
      setNotification({
        type: 'success',
        content: `A new blog ${blog.title} added`,
      });
    } catch (error) {
      setNotification({
        type: 'error',
        content: `${error.response.data.error}`,
      });
    }
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.giveLike(blog);
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (error) {
      setNotification({
        type: 'error',
        content: `${error.response.data.error}`,
      });
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification spec={notification} />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification spec={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggle label="New blog" ref={createBlogFormRef}>
        <CreateBlogForm createBlog={addBlog} />
      </Toggle>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLike={() => likeBlog(blog)} />
      ))}
    </div>
  );
};

export default App;
