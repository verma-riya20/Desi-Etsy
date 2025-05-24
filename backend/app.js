import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you're using cookies or sessions
}));

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded images at /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





app.use(express.json({limit:"16 kb"}))
app.use(express.urlencoded({extended:true,limit:"16 kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import adminRoutes from './src/routes/adminRoutes.js'
import artisanRoutes from './src/routes/artisanRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import addressRoutes from './src/routes/addressRoutes.js'

app.use('/api/admin', adminRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/product', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);

export {app}