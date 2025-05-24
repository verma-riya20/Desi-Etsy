import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: 'No description provided' }, // optional if not given
  price: { type: Number, required: true },
  image: { type: String, required: true },
  material: { type: String },         // <-- Added
  category: { type: String },         // <-- Added
  isApproved: { type: Boolean, default: false },
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan',
    default: null                     // <-- Optional for now
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
