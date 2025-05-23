import React, { useState } from "react";

const FilterSidebar = ({ onFilter, onSort }) => {
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

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300 bg-white space-y-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>

      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          onChange={handleSortChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Default</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
        </select>
      </div>

      <div>
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

      <div>
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
