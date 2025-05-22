import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you're using cookies or sessions
}));

app.use(express.json({limit:"16 kb"}))
app.use(express.urlencoded({extended:true,limit:"16 kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import adminRoutes from './src/routes/adminRoutes.js'
import artisanRoutes from './src/routes/artisanRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

app.use('/api/admin', adminRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/product', productRoutes);
app.use('/api/v1/users', userRoutes);

export {app}