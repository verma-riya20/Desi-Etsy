import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
