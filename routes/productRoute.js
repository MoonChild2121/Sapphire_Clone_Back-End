const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Update with the correct path to your model file

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products/:category', async (req, res) => {
    try {
        console.log(`Fetching products for category: ${req.params.category}`);
        const products = await Product.find({ category: req.params.category });
        console.log('Products found:', products);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
