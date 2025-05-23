import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 relative hover:shadow-xl transition">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-xl" />
      <h2 className="mt-2 font-bold text-lg">{product.name}</h2>
      <p className="text-sm text-gray-600">Material: {product.material}</p>
      <p className="text-md font-semibold mt-1">₹{product.price}</p>
      <p className="text-sm text-gray-500">Quantity: {product.quantity || 1}</p>
      <div className="flex items-center gap-1 text-yellow-500 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < product.rating ? "text-yellow-500" : "text-gray-300"} />
        ))}
        <span className="text-sm text-gray-600 ml-2">({product.rating}/5)</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="text-white bg-[#F4A261] px-3 py-1 rounded-xl hover:bg-[#e76f51] flex items-center gap-2">
          <FaShoppingCart /> Move to Cart
        </button>
        <button className="text-red-500 hover:text-red-700 text-xl">
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;




