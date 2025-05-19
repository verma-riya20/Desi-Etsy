import React, { useState } from 'react';
import '../CSS/Login.css'; 
import {Link} from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your logic for login here (e.g., authentication)
  };

  return (
    <div className="login-container">
      {/* Login Form */}
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Link to Sign Up */}
        <p>
          Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
