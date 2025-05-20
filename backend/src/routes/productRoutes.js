import express from 'express';
import Product from '../models/products.js';
import Artisan from '../models/artisan.js';

const router = express.Router();

// Artisan uploads product
router.post('/upload', async (req, res) => {
  try {
    const { name, description, price, artisanId } = req.body;

    const artisan = await Artisan.findById(artisanId);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    if (artisan.status !== 'approved') {
      return res.status(403).json({ error: 'Only approved artisans can upload products' });
    }

    const product = new Product({ name, description, price, artisanId, isApproved: false });
    await product.save();
    res.status(201).json({ message: 'Product uploaded. Awaiting approval.', product });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

export default router;
