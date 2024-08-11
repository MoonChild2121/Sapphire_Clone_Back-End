// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product'); 


// Get Cart for the current user
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Fetch detailed product information for each cart item
        const cartWithDetails = await Promise.all(user.cart.map(async item => {
            const product = await Product.findById(item.productId);
            return {
                ...item.toObject(),
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            };
        }));

        res.json(cartWithDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/', protect, async (req, res) => {
    const { productId, quantity, img } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const product = await Product.findById(productId);  // Get product details

        const existingItemIndex = user.cart.findIndex(item => item.productId === productId);
        if (existingItemIndex > -1) {
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            user.cart.push({
                productId,
                quantity,
                img,
                name: product.name,
                price: product.price
            });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Remove item from cart
router.delete('/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.cart = user.cart.filter(item => item.productId !== req.params.productId);
        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update cart item quantity
router.put('/:productId', protect, async (req, res) => {
    const { quantity } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const itemIndex = user.cart.findIndex(item => item.productId === req.params.productId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                user.cart[itemIndex].quantity = quantity;
            } else {
                user.cart.splice(itemIndex, 1); // Remove item if quantity is 0
            }
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
