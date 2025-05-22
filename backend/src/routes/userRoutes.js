import {Router} from 'express';
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controllers/userController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router=Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//middleware is used
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
export default router;