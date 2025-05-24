// components/ShippingAddressForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    sameAsBilling: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/address/newaddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save address");
      }

      const result = await res.json();
      console.log("Address saved:", result);

      // Navigate to payment page after successful save
      navigate("/payment");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-6 rounded shadow">
        <input
          type="text"
          name="company"
          placeholder="Company's Name (Optional)"
          value={formData.company}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City/District/Town"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address (Area and Street)"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full mt-2 p-2 border rounded"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full mt-2 p-2 border rounded"
        />

        <label className="flex items-center mt-4">
          <input
            type="checkbox"
            name="sameAsBilling"
            checked={formData.sameAsBilling}
            onChange={handleChange}
            className="mr-2"
          />
          Same as Billing Address
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Saving..." : "Save and Deliver here"}
        </button>
      </form>
    </div>
  );
}
