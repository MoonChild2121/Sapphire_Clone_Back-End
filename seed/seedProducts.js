const mongoose = require('mongoose');
const Product = require('../models/Product'); // Update with the correct path to your model file

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/sapphire', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('Failed to connect to MongoDB:', err));

// Create an array of products to insert into the database
const products = [
    {
        name: 'HYDRATING LIPSTICK - ROSEWOOD',
        description: 'A hydrating lipstick in rosewood shade.',
        price: 3890.00,
        category: 'beauty',
        images: [
            'https://i.ibb.co/P42pfhQ/suit11.png',
            'https://i.ibb.co/zX0yWSv/suit12.png'
        ],
    },
    {
        name: 'HYDRATING LIPSTICK - BERRY RED',
        description: 'A hydrating lipstick in berry red shade.',
        price: 3490.00,
        category: 'beauty',
        images: [
            'https://i.ibb.co/0DYjWTH/suit21.png',
            'https://i.ibb.co/VQ8YW8Z/suit22.png'
        ],
    },
    {
        name: 'EYESHADOW PALETTE - SMOKEY GLOW',
        description: 'An eyeshadow palette for a smoky eye look.',
        price: 5490.00,
        category: 'beauty',
        images: [
            'https://i.ibb.co/KN5tS61/suit31.png',
            'https://i.ibb.co/W0XCXBy/suit32.png'
        ],
    },
    {
        name: 'EYESHADOW PALETTE - SUNSET GLOW',
        description: 'An eyeshadow palette with sunset hues.',
        price: 5890.00,
        category: 'beauty',
        images: [
            'https://i.ibb.co/3FTfkMh/suit41.png',
            'https://i.ibb.co/Dwd52cn/suit42.png'
        ],
    },
    {
        name: '2 PIECE - PRINTED LINEN SET',
        description: 'A two-piece printed linen set for kids.',
        price: 3890.00,
        category: 'kids',
        images: [
            'https://i.ibb.co/Wk4NH39/suit11.png',
            'https://i.ibb.co/VDV2GRt/suit12.png'
        ],
    },
    {
        name: 'PRINTED LINEN JUMPSUIT',
        description: 'A printed linen jumpsuit for kids.',
        price: 3490.00,
        category: 'kids',
        images: [
            'https://i.ibb.co/hK9swdN/suit21.png',
            'https://i.ibb.co/gWfmmZ0/suit22.png'
        ],
    },
    {
        name: '2 PIECE - EMBROIDERED LINEN SET',
        description: 'A two-piece embroidered linen set for kids.',
        price: 5490.00,
        category: 'kids',
        images: [
            'https://i.ibb.co/xYPGjxC/suit31.png',
            'https://i.ibb.co/0ZtFQhD/suit32.png'
        ],
    },
    {
        name: 'PRINTED ARABIC LAWN DRESS',
        description: 'A printed Arabic lawn dress for kids.',
        price: 5890.00,
        category: 'kids',
        images: [
            'https://i.ibb.co/Dg3Jj9r/suit41.png',
            'https://i.ibb.co/2WX5vy9/suit42.png'
        ],
    },
    {
        name: 'SATIN SUIT',
        description: 'A luxurious satin suit for men.',
        price: 5590.00,
        category: 'men',
        images: [
            'https://i.ibb.co/hRzH6kb/suit11.png',
            'https://i.ibb.co/gr4bTM0/suit12.png'
        ],
    },
    {
        name: 'WASH AND WEAR DOBBY SUIT',
        description: 'A wash-and-wear dobby suit for men.',
        price: 4990.00,
        category: 'men',
        images: [
            'https://i.ibb.co/9NWTV4D/suit21.png',
            'https://i.ibb.co/JdBL7MH/suit22.png'
        ],
    },
    {
        name: 'WASH AND WEAR DOBBY SUIT',
        description: 'A wash-and-wear dobby suit for men.',
        price: 4990.00,
        category: 'men',
        images: [
            'https://i.ibb.co/4jpTHHJ/suit31.png',
            'https://i.ibb.co/vP7B46k/suit32.png'
        ],
    },
    {
        name: 'WASH AND WEAR DOBBY SUIT',
        description: 'A wash-and-wear dobby suit for men.',
        price: 4990.00,
        category: 'men',
        images: [
            'https://i.ibb.co/9s3dj6C/suit41.png',
            'https://i.ibb.co/r46cLZh/suit42.png'
        ],
    },
    {
        name: 'PRINTED LAWN SHIRT',
        description: 'A printed lawn shirt for women.',
        price: 1290.00,
        category: 'women',
        images: [
            'https://i.ibb.co/4f3Nzbc/suit1pic1.png',
            'https://i.ibb.co/KxJBn8Y/suit1pic2.png'
        ],
    },
    {
        name: 'PRINTED LAWN SHIRT',
        description: 'A printed lawn shirt for women.',
        price: 1290.00,
        category: 'women',
        images: [
            'https://i.ibb.co/4JMBWTB/suit2pic1.png',
            'https://i.ibb.co/64Zv8Pr/suit2pic2.png'
        ],
    },
    {
        name: 'PRINTED LAWN SHIRT',
        description: 'A printed lawn shirt for women.',
        price: 1290.00,
        category: 'women',
        images: [
            'https://i.ibb.co/f87v3d0/suit3pic1.png',
            'https://i.ibb.co/60nfqdL/suit3pic2.png'
        ],
    },
    {
        name: 'PRINTED LAWN SHIRT',
        description: 'A printed lawn shirt for women.',
        price: 1290.00,
        category: 'women',
        images: [
            'https://i.ibb.co/37XRXkY/suit4pic1.png',
            'https://i.ibb.co/VDPjnG1/suit4pic2.png'
        ],
    }
    // Add more products as needed
];

// Insert the products into the database
Product.insertMany(products)
.then(() => {
    console.log('Products added successfully');
    mongoose.connection.close(); // Close the connection after the operation
})
.catch(err => {
    console.log('Error adding products:', err);
    mongoose.connection.close(); // Close the connection even if there's an error
});
