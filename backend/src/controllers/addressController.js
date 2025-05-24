// src/controllers/addressController.js
import Address from "../models/address.js";

// @desc    Save new address
// @route   POST /api/address
// @access  Public (or Protected if using auth)
import mongoose from "mongoose";

export const createAddress = async (req, res) => {
  try {
    // Use req.user?.id if exists, else generate a new ObjectId string
    const userId = req.user?.id || new mongoose.Types.ObjectId().toString();

    const address = new Address({ ...req.body, userId });
    const saved = await address.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save address", error: error.message });
  }
};


// @desc    Get all addresses for a user
// @route   GET /api/address/:userId
// @access  Public (or Protected)
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
  }
};
