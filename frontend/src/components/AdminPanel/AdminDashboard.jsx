// src/pages/AdminDashboard.jsx
// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/pending-artisans')
  .then(res => {
    const data = Array.isArray(res.data) ? res.data : res.data.artisans || [];
    setArtisans(data);
  })
  .catch(err => {
    console.error('Error fetching artisans:', err);
    setArtisans([]);
  });

  }, []);

  const approveArtisan = (id) => {
    axios.put(`/api/admin/approve-artisan/${id}`)
      .then(() => setArtisans(prev => prev.filter(a => a._id !== id)));
  };

  const rejectArtisan = (id) => {
    axios.put(`/api/admin/reject-artisan/${id}`)
      .then(() => setArtisans(prev => prev.filter(a => a._id !== id)));
  };

  const approveProduct = (id) => {
    axios.put(`/api/admin/approve-product/${id}`)
      .then(() => setProducts(prev => prev.filter(p => p._id !== id)));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pending Artisan Approvals</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Portfolio</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(artisans) && artisans.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-4">No pending artisans</td></tr>
            ) : Array.isArray(artisans) && artisans.map(artisan => (
              <tr key={artisan._id}>
                <td className="border p-2">{artisan.name}</td>
                <td className="border p-2">{artisan.email}</td>
                <td className="border p-2">
                  {artisan.portfolio ? <a href={artisan.portfolio} target="_blank" className="text-blue-600 underline">View</a> : '—'}
                </td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => approveArtisan(artisan._id)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={() => rejectArtisan(artisan._id)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Product Approvals</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Seller</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length === 0 ? (
              <tr><td colSpan="3" className="text-center p-4">No pending products</td></tr>
            ) : Array.isArray(products) && products.map(product => (
              <tr key={product._id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.artisanId?.name || 'Unknown'}</td>
                <td className="border p-2">
                  <button onClick={() => approveProduct(product._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
