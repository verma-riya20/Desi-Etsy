// src/pages/RegisterArtisan.jsx
import { useState } from 'react';
import axios from 'axios';

export default function RegisterArtisan() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    portfolio: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/artisans/register', form);
      alert('Registered successfully! Awaiting admin approval.');
      setForm({ name: '', email: '', portfolio: '' });
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register as Artisan</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 mb-3 border"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 mb-3 border"
      />
      <input
        type="text"
        name="portfolio"
        value={form.portfolio}
        onChange={handleChange}
        placeholder="Portfolio URL (optional)"
        className="w-full p-2 mb-4 border"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
    </form>
  );
}
