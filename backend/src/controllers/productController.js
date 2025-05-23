import Product from '../models/products.js';
import Artisan from '../models/artisan.js';
import upload from '../middleware/multer.middleware.js';

export const uploadProduct = async (req, res) => {
  try {
    const { name, description, price, artisanName, artisanEmail } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const artisan = await Artisan.findOne({ name: artisanName, email: artisanEmail });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }

    if (artisan.status !== 'approved') {
      return res.status(403).json({ error: 'Artisan is not approved to upload products' });
    }

    const product = new Product({
      name,
      description,
      price,
      artisan: artisan._id,
      image
    });

    await product.save();
    res.status(201).json({ message: 'Product uploaded. Awaiting admin approval.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }).populate('artisan', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending products' });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, { isApproved: true }, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product approved', product });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

export const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true }).populate('artisan', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved products' });
  }
};

