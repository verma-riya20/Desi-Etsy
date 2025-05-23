import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingArtisans, setLoadingArtisans] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorArtisans, setErrorArtisans] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  // Fetch pending artisans
  const fetchPendingArtisans = useCallback(async () => {
    setLoadingArtisans(true);
    setErrorArtisans(null);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pending-artisans');
      const data = Array.isArray(res.data) ? res.data : [];
      setArtisans(data);
    } catch (err) {
      console.error('Error fetching artisans:', err);
      setErrorArtisans('Failed to fetch pending artisans. Please try again.');
      setArtisans([]);
    } finally {
      setLoadingArtisans(false);
    }
  }, []);

  // Fetch pending products
  const fetchPendingProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pending-products');
      const data = Array.isArray(res.data) ? res.data : [];
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setErrorProducts('Failed to fetch pending products.');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingArtisans();
    fetchPendingProducts();
  }, [fetchPendingArtisans, fetchPendingProducts]);

  const approveArtisan = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-artisan/${id}`);
      fetchPendingArtisans();
    } catch (err) {
      console.error('Error approving artisan:', err);
      alert('Failed to approve artisan.');
    }
  };

  const rejectArtisan = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject-artisan/${id}`);
      fetchPendingArtisans();
    } catch (err) {
      console.error('Error rejecting artisan:', err);
      alert('Failed to reject artisan.');
    }
  };

  const approveProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/product/approve/${id}`);

      fetchPendingProducts();
    } catch (err) {
      console.error('Error approving product:', err);
      alert('Failed to approve product.');
    }
  };

  const rejectProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject-product/${id}`);
      fetchPendingProducts();
    } catch (err) {
      console.error('Error rejecting product:', err);
      alert('Failed to reject product.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Admin Dashboard</h1>

      {/* Artisan Approval Section */}
      <section className="mb-12 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">Pending Artisan Approvals</h2>
        {loadingArtisans && <p className="text-center text-blue-600">Loading pending artisans...</p>}
        {errorArtisans && <p className="text-center text-red-600">{errorArtisans}</p>}
        {!loadingArtisans && !errorArtisans && artisans.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No pending artisans</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Portfolio</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artisans.map(artisan => (
                  <tr key={artisan._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 border-b text-gray-800">{artisan.name}</td>
                    <td className="py-3 px-4 border-b text-gray-800">{artisan.email}</td>
                    <td className="py-3 px-4 border-b">
                      {artisan.portfolio ? (
                        <a
                          href={artisan.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline transition-colors duration-200"
                        >
                          View Portfolio
                        </a>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => approveArtisan(artisan._id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectArtisan(artisan._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Product Approval Section */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">Pending Product Approvals</h2>
        {loadingProducts && <p className="text-center text-blue-600">Loading pending products...</p>}
        {errorProducts && <p className="text-center text-red-600">{errorProducts}</p>}
        {!loadingProducts && !errorProducts && products.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No pending products</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Product</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Artisan</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 border-b text-gray-800">{product.name}</td>
                    <td className="py-3 px-4 border-b text-gray-800">{product.artisan?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => approveProduct(product._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
