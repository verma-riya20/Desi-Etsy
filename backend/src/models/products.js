import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan' },
  isApproved: { type: Boolean, default: false },
  images: [String],
  inStock: Boolean,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
