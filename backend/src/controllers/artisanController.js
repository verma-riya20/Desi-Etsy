import Artisan from '../models/artisan.js';

// Register artisan
export const registerArtisan = async (req, res) => {
  try {
    const artisan = new Artisan({ ...req.body, status: 'pending' });
    await artisan.save();
    res.status(201).json({ message: 'Registered. Awaiting approval.', artisan });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

// Get pending artisans (Admin)
export const getPendingArtisans = async (req, res) => {
  try {
    const pending = await Artisan.find({ status: 'pending' });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending artisans' });
  }
};

// Approve artisan
export const approveArtisan = async (req, res) => {
  try {
    const updated = await Artisan.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json({ message: 'Artisan approved', artisan: updated });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

// Reject artisan
export const rejectArtisan = async (req, res) => {
  try {
    const updated = await Artisan.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json({ message: 'Artisan rejected', artisan: updated });
  } catch (err) {
    res.status(500).json({ error: 'Rejection failed' });
  }
};