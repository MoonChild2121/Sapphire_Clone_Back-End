const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: String,
    name: String,        // Add name
    price: Number        // Add price
});



const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [CartItemSchema] // New field for cart
});

// Password comparison method
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
