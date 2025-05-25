import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation

const SellerCards = () => {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/approved');
        if (Array.isArray(response.data)) {
          setSellers(response.data);
        } else {
          console.error('Expected an array, got:', response.data);
          setError('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching approved sellers:', err);
        setError('Failed to load sellers.');
      }
    };
    fetchSellers();
  }, []);

  const handleUploadClick = (seller) => {
    // Navigate to upload product page with seller details (optional: pass as state)
    navigate('/upload', {
      state: {
        artisanName: seller.name,
        artisanEmail: seller.email,
      },
    });
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Artisans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div key={seller._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`http://localhost:5000/uploads/${seller.image}` || 'https://via.placeholder.com/300'}
              alt={seller.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{seller.name}</h3>
              <p className="text-sm text-gray-600">{seller.email}</p>
              {seller.portfolio && (
                <a
                  href={seller.portfolio}
                  className="text-blue-500 hover:underline mt-2 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Portfolio
                </a>
              )}
              <button
                onClick={() => handleUploadClick(seller)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Upload Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellerCards;
