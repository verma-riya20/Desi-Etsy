import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const search = new URLSearchParams(useLocation().search);
  const query = search.get("query");

  // Dummy data — replace this with your real product data or API call
  const products = [
    { id: 1, name: "Handmade Wooden Vase" },
    { id: 2, name: "Clay Pot" },
    { id: 3, name: "Wool Scarf" },
  ];

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Results for "{query}"
      </h2>
      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
              {p.name}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
