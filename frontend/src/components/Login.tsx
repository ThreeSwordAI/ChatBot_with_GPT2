// frontend/src/components/Login.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: (userId: number) => void;
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, switchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      const user = response.data;
      console.log('Login successful:', user);
      onLoginSuccess(user.id);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={switchToSignup}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
