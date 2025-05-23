import Artisan from '../models/artisan.js';

export const getPendingArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find({ isVerified: false });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending artisans' });
  }
};

export const verifyArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });

    if (!artisan.portfolio || !artisan.documentsSubmitted) {
      return res.status(400).json({ error: 'Incomplete profile. Cannot verify.' });
    }

    artisan.isVerified = true;
    await artisan.save();
    res.json({ message: 'Artisan verified' });
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
};