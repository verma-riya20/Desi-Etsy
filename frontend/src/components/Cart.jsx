import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  addToCartAPI,
  clearCartAPI,
  updateCartItemQuantityAPI,
  setCartItems,
} from '../redux/slices/cartSlice';

const API_BASE = 'http://localhost:5000';

export default function Cart() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const user = auth?.user;
  const { items: cartItems, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_BASE}/api/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
          dispatch(setCartItems(res.data.items));
        })
        .catch((err) => console.error('Failed to fetch cart', err));
    }
  }, [user, dispatch]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/address');
  };

  const handleClearCart = () => {
    dispatch(clearCartAPI());
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // optional: prevent quantity below 1
    dispatch(updateCartItemQuantityAPI({ productId, quantity: newQuantity }));
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 lg:px-20">
      <h2 className="text-4xl font-bold text-center mb-10">Your Cart</h2>

      {status === 'loading' && <p>Loading cart...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-sm text-gray-600">
                <th className="pb-3">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Total</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item._id || item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl object-cover border"
                      />
                      <div>
                        <p className="font-medium text-lg text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.material || 'Handmade'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-md">₹{item.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-md">₹{item.price * item.quantity}</td>
                  <td className="py-4">
                    <button
                      onClick={() => handleQuantityChange(item._id || item.id, 0)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {cartItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full lg:w-1/3 bg-gray-50 p-6 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between py-2 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="py-4 border-t mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>

          <button
            onClick={handleClearCart}
            className="w-full mt-3 text-red-500 hover:underline text-sm"
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
