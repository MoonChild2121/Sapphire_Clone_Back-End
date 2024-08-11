const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'beauty', 'kids', 'men', 'women'
    images: [{ type: String, required: true }], // Array of image URLs
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
