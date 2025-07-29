// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // 1. Import Link

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin'); 
    } catch (error) {
      console.error("Failed to log in", error);
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>Admin Login</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <Link to="/" className="return-link">
        &larr; Return to Portfolio
      </Link>
    </div>
  );
};

export default LoginPage;