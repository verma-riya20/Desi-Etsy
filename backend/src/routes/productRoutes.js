import express from 'express';
import {
  uploadProduct,
  getPendingProducts,
  approveProduct,
  getApprovedProducts
} from '../controllers/productController.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadProduct); // ✅ important
router.get('/pending', getPendingProducts);
router.put('/approve/:productId', approveProduct);


router.get('/approved', getApprovedProducts);


export default router;
