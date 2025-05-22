// server.js
const express = require('express');
const cors = require('cors'); // To handle cross-origin requests if needed
const app = express();

// Middleware to allow CORS
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Dummy product data (you can replace this with a real database later)
const products = [
  { id: 1, name: 'Handmade Vase', category: 'Home Decor', description: 'A beautiful handmade vase' },
  { id: 2, name: 'Wooden Spoon', category: 'Kitchen', description: 'A handcrafted wooden spoon' },
  { id: 3, name: 'Handwoven Basket', category: 'Storage', description: 'A traditional handwoven basket' },
  { id: 4, name: 'Ceramic Mug', category: 'Kitchen', description: 'A hand-painted ceramic mug' },
];

// API route to search products
app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  
  // Filter products based on query (case insensitive)
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
