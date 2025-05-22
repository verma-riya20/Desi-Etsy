import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const products = [
  { id: 1, name: "Handmade Pottery" },
  { id: 2, name: "Woven Basket" },
  { id: 3, name: "Wooden Carving" },
];

// Helper hook to read query params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Search Results for "{query}"</h1>

      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} className="mb-2">
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600 font-semibold">No items found.</p>
      )}
    </div>
  );
};

export default SearchPage;
