const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware').protect;

// Add item to cart
router.post('/cart/add', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('User retrieved:', user); // Debugging log

        const { productId, quantity, img } = req.body;
        console.log('Request body:', req.body); // Debugging log

        const existingItem = user.cart.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, img });
        }

        await user.save();
        console.log('Cart updated:', user.cart); // Debugging log
        res.status(200).json(user.cart);
    } catch (err) {
        console.error('Error adding item to cart:', err); // Debugging log
        res.status(500).json({ message: err.message });
    }
});


// Get cart items
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('User cart retrieved:', user.cart); // Debugging log
        res.status(200).json(user.cart || []);
    } catch (err) {
        console.error('Error retrieving cart items:', err); // Debugging log
        res.status(500).json({ message: err.message });
    }
});

// Update cart item
router.patch('/cart/update', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('User retrieved:', user); // Debugging log

        const { productId, quantity } = req.body;
        console.log('Request body:', req.body); // Debugging log

        const item = user.cart.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity;
            await user.save();
            console.log('Cart updated:', user.cart); // Debugging log
            res.status(200).json(user.cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (err) {
        console.error('Error updating cart item:', err); // Debugging log
        res.status(500).json({ message: err.message });
    }
});

// Remove item from cart
router.delete('/cart/remove/:productId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('User retrieved:', user); // Debugging log

        const { productId } = req.params;
        console.log('Product ID to remove:', productId); // Debugging log

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        console.log('Cart updated:', user.cart); // Debugging log
        res.status(200).json(user.cart);
    } catch (err) {
        console.error('Error removing item from cart:', err); // Debugging log
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
