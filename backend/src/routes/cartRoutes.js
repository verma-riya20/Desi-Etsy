import express from 'express';
import { addToCart, getCart, removeFromCart, clearCart,updateCart } from '../controllers/cartController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT); // Apply JWT verification middleware to all routes in this router

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);
router.put('/update', verifyJWT, updateCart);


export default router;
