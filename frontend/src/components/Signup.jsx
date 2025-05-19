import React, { useState } from 'react';
import '../CSS/Signup.css'; 
import {Link} from "react-router-dom"; 

const SignUp = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit (no backend logic yet)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sign up form submitted');
  };

  return (
    <div className="container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
    </div>
  );
};

export default SignUp;
