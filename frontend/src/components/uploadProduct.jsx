import { useState } from 'react';
import axios from 'axios';

export default function UploadProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    material: '',
    category: '',
    artisanName: '',
    artisanEmail: '',
    image: null
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('material', form.material);
    formData.append('category', form.category);
    formData.append('artisanName', form.artisanName);
    formData.append('artisanEmail', form.artisanEmail);
    formData.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/product/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product submitted successfully!');
      setForm({
        name: '',
        description: '',
        price: '',
        material: '',
        category: '',
        artisanName: '',
        artisanEmail: '',
        image: null
      });
    } catch (err) {
      alert(err?.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>

      <input name="artisanName" value={form.artisanName} onChange={handleChange} placeholder="Your Name" required className="w-full p-2 mb-3 border" />

      <input name="artisanEmail" value={form.artisanEmail} onChange={handleChange} placeholder="Your Email" required type="email" className="w-full p-2 mb-3 border" />

      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required className="w-full p-2 mb-3 border" />

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product Description" required className="w-full p-2 mb-3 border" />

      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="w-full p-2 mb-3 border" />

      <input name="material" value={form.material} onChange={handleChange} placeholder="Material (e.g. Clay, Thread)" className="w-full p-2 mb-3 border" />

      <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Jewellery, Bags)" className="w-full p-2 mb-3 border" />

      <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} required className="w-full p-2 mb-4 border" />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Submit Product</button>
    </form>
  );
}
