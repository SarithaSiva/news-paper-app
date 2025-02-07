import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual login API call
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save token to localStorage
        navigate('/'); // Redirect to home page after login
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Login
        </Button>
      </form>
      {message && <Typography color="error">{message}</Typography>}
    </Container>
  );
};

export default Login;