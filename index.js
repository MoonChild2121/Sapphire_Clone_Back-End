const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoute'); // Update with the correct path to your routes file
const cartRoutes = require('./routes/cartRoutes')

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors()); // Allow all origins by default

// Or configure CORS to allow specific origins if needed
// const corsOptions = {
//     origin: 'http://localhost:3000', // Replace with your frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization'
// };
// app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
