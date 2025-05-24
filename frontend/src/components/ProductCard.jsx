import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCartAPI } from "../redux/slices/cartSlice"; // Use async thunk
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log(product);
    if (!product.id) {
      console.error("Product ID missing");
      return;
    }
    dispatch(
      addToCartAPI({
        productId: product.id,
        quantity: 1,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 relative hover:shadow-xl transition-all duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-xl"
      />

      <h2 className="mt-3 font-bold text-lg text-[#1B1B1B]">{product.name}</h2>
      <p className="text-sm text-gray-600 mt-1">Material: {product.material}</p>
      <p className="text-md font-semibold text-[#1B1B1B] mt-1">₹{product.price}</p>
      <p className="text-sm text-gray-500">Quantity: {product.quantity || 1}</p>

      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={i < (product.rating || 4) ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({product.rating || 4}/5)</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleAddToCart}
          className="text-white bg-[#F4A261] px-3 py-1.5 rounded-xl hover:bg-[#e76f51] flex items-center gap-2 text-sm transition-all"
        >
          <FaShoppingCart /> Add to Cart
        </button>

        <button
          className="text-gray-400 hover:text-red-500 text-xl transition-all"
          title="Add to Wishlist"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
