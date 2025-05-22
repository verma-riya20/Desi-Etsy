// src/pages/RegisterArtisan.jsx
import { useState } from 'react';
import axios from 'axios';

export default function RegisterArtisan() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    portfolio: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/artisans/register', form);
      alert('Registered successfully! Awaiting admin approval.');
      setForm({ name: '', email: '', portfolio: '' });
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">
          Register as Artisan
        </h2>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email <span className="text-pink-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
        <div className="mb-7">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="portfolio">
            Portfolio URL <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="portfolio"
            id="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-lg transition bg-gradient-to-r from-blue-400 to-pink-300 text-white shadow-lg hover:from-blue-700 hover:to-pink-600 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
       
      </form>
    </div>
  );
}
