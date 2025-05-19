import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerifyArtisans() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/pending-artisans')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setArtisans(data);
        } else {
          console.error("Expected an array but got:", data);
          setArtisans([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleVerify = (id) => {
    axios.post(`/api/admin/verify-artisan/${id}`)
      .then(() => {
        setArtisans(prev => prev.filter(a => a.id !== id));
        alert("Artisan verified!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Pending Artisan Verifications</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Portfolio</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artisans.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No pending artisans</td>
              </tr>
            ) : (
              artisans.map(artisan => (
                <tr key={artisan.id} className="border-t">
                  <td className="p-3 border font-medium">{artisan.name}</td>
                  <td className="p-3 border">{artisan.email}</td>
                  <td className="p-3 border">
                    <a href={artisan.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleVerify(artisan.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
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
