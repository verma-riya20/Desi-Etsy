import React, { useState } from "react";

const FilterSidebar = ({ onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 10000]);

  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilter({ category: updated, priceRange });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([1, value]);
    onFilter({ category: selectedCategories, priceRange: [1, value] });
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300 bg-white">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        {["Jewellery", "Bags", "Wall Hangings", "Home Decor", "Kitchenware"].map(cat => (
          <label key={cat} className="block mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCategoryChange(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range: ₹1 – ₹{priceRange[1]}</h3>
        <input
          type="range"
          min="1"
          max="10000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
