import express from 'express';
import {
  getPendingArtisans,
  approveArtisan,
  rejectArtisan,
  getApprovedArtisans
} from '../controllers/artisanController.js';

import {
  getPendingProducts,
  approveProduct
} from '../controllers/productController.js';

const router = express.Router();

// Artisan approval routes
router.get('/pending-artisans', getPendingArtisans);
router.put('/approve-artisan/:id', approveArtisan);
router.put('/reject-artisan/:id', rejectArtisan);
router.get('/approved', getApprovedArtisans);



 

// Product approval routes
router.get('/pending-products', getPendingProducts);
router.put('/approve-product/:id', approveProduct);

export default router;