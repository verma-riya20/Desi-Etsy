import Product from '../models/products.js';

export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }).populate('artisanId', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('artisanId');

    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (!product.artisanId.isVerified || !product.images.length || !product.inStock) {
      return res.status(400).json({ error: 'Product does not meet approval criteria' });
    }

    product.isApproved = true;
    await product.save();
    res.json({ message: 'Product approved' });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};