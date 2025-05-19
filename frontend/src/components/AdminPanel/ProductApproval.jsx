import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductApproval() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/pending-products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    axios.post(`/api/admin/approve-product/${id}`)
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert("Product approved!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Product Approvals</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Product Name</th>
              <th className="p-3 border">Seller</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">No pending products</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="border-t">
                  <td className="p-3 border font-medium">{product.name}</td>
                  <td className="p-3 border">{product.sellerName}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleApprove(product.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
