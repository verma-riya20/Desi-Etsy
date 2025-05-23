// src/pages/UploadProduct.jsx
import { useState } from 'react';
import axios from 'axios';

export default function UploadProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    artisanId: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/products/upload', form);
      alert('Product submitted successfully! Awaiting admin approval.');
      setForm({ name: '', description: '', price: '', artisanId: '' });
    } catch (err) {
      console.error(err);
      alert('Product submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Product</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="w-full p-2 mb-3 border"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        className="w-full p-2 mb-3 border"
      ></textarea>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="w-full p-2 mb-3 border"
      />
      <input
        type="text"
        name="artisanId"
        value={form.artisanId}
        onChange={handleChange}
        placeholder="Your Artisan ID"
        required
        className="w-full p-2 mb-4 border"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Submit Product</button>
    </form>
  );
}