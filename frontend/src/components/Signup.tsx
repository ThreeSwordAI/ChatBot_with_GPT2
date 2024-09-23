// frontend/src/components/Signup.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface SignupProps {
  switchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:8000/signup', {
        name,
        username,
        password,
        re_password: rePassword,
      });
      switchToLogin();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
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
        <input
          type="password"
          placeholder="Re-type Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
