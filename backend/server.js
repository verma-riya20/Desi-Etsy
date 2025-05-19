// server.js
import dotenv from 'dotenv'
import {app} from './app.js';
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


