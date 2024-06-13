import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.getdexterapp.com/api/backoffice/login', {
        email: email,
        password: password,
      });
      console.log('API response:', response);

      if (response.data && response.data.data && response.data.data.token) {
        const token = response.data.data.token;
        sessionStorage.setItem('accessToken', token);
        console.log('Token stored:', token); // Log the token to verify
        onLogin();
        console.log('Login successful');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='login_body'>
      <div className="login-container">
        <img src="../images/logo.png" alt="" />
        <h2>Dexter Admin</h2>
        <div className='login-body-item'>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className='login-body-item'>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
