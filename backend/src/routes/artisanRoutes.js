import express from 'express';
import { registerArtisan } from '../controllers/artisanController.js';

const router = express.Router();
router.post('/register', registerArtisan);
export default router;
