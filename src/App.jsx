import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
    if (notification) setTimeout(() => setNotification(null), 2500);
  }, [notification]);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <h2>Please log in</h2>
        {notification && (
          <Notification
            type={notification.type}
            content={notification.content}
          />
        )}
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {notification && (
        <Notification type={notification.type} content={notification.content} />
      )}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create new blog</h2>
      <CreateBlogForm setBlogs={setBlogs} setNotification={setNotification} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
