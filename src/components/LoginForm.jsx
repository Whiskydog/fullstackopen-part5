import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      document.activeElement && document.activeElement.blur();
      setUsername('');
      setPassword('');
      setNotification({
        type: 'error',
        content: `${error.response.data.error}`,
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
