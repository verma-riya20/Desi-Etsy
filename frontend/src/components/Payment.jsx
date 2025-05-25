import React, { useState } from "react";
import { FaGooglePay, FaMoneyBillWave } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePayment = () => {
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF7F2] px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">Order Received!</h2>
          <p className="text-gray-600">Thank you for shopping with Karigarhaat. Your order is confirmed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#1B1B1B] mb-6 text-center">Choose Payment Method</h2>

        <div className="flex justify-center gap-6 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
              selectedMethod === "gpay"
                ? "bg-green-100 border-green-400"
                : "bg-gray-100 hover:bg-green-50 border-transparent"
            }`}
            onClick={() => setSelectedMethod("gpay")}
          >
            <FaGooglePay className="text-2xl text-[#34A853]" />
            <span className="text-sm font-medium text-[#1B1B1B]">Google Pay</span>
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
              selectedMethod === "cod"
                ? "bg-orange-100 border-orange-400"
                : "bg-gray-100 hover:bg-orange-50 border-transparent"
            }`}
            onClick={() => setSelectedMethod("cod")}
          >
            <FaMoneyBillWave className="text-2xl text-[#e76f51]" />
            <span className="text-sm font-medium text-[#1B1B1B]">Cash on Delivery</span>
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal (2 items)</span>
            <span>₹650.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>₹50.00</span>
          </div>
          <div className="flex justify-between font-semibold text-[#1B1B1B] border-t pt-2">
            <span>Total Amount</span>
            <span>₹700.00</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
