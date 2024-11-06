// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/blogs', require('./routes/posts'));
app.use('/product',  require('./routes/product'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/cart',  require('./routes/cartRoutes'));
app.use('/checkout',  require('./routes/checkoutRoutes'));

// Connect to database and start server
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
