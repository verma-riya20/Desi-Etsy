import mongoose from 'mongoose';

const ArtisanSchema = new mongoose.Schema({
  name: String,
  email: String,
  portfolio: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  documentsSubmitted: Boolean
});


const Artisan = mongoose.model('Artisan', ArtisanSchema);
export default Artisan;