import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UploadProduct() {
  const navigate = useNavigate();

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

  const [successMessage, setSuccessMessage] = useState('');

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
      setSuccessMessage('🎉 Product submitted successfully! Please wait for admin approval.');
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
      setSuccessMessage(err?.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          {successMessage}
          <div className="mt-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}

      {!successMessage && (
        <form onSubmit={handleSubmit}>
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
      )}
    </div>
  );
}
