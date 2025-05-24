import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/approved");
        const approvedProducts = res.data.map((product) => ({
          id: product._id,
          name: product.name,
          image: `http://localhost:5000/uploads/${product.image}`, // Make sure this matches how you serve images
          price: product.price,
          material: product.material || "Handmade",
          category: product.category || "Misc",
        }));
        setProducts(approvedProducts);
        setFilteredProducts(approvedProducts);
      } catch (err) {
        console.error("Failed to fetch approved products:", err);
      }
    };

    fetchApprovedProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleFilter = ({ category, priceRange }) => {
    const filtered = products.filter(
      (product) =>
        (category.length === 0 || category.includes(product.category)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredProducts];
    if (sortType === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "ratingHigh") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1B1B1B] min-h-screen">
      {/* Search bar */}
      <div className="flex justify-center items-center py-6 px-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, material, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Layout with filters and products */}
      <div className="flex flex-col md:flex-row gap-6 px-4 pb-10">
        <div className="w-full md:w-[250px]">
          <FilterSidebar onFilter={handleFilter} onSort={handleSort} />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
