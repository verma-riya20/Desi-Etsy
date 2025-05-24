// src/routes/addressRoutes.js
import express from "express";
import { createAddress, getUserAddresses } from "../controllers/addressController.js";

const router = express.Router();

// Save new address
router.post("/newaddress", createAddress);

// Get all addresses for a user
router.get("/:userId", getUserAddresses);

export default router;
