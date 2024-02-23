const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Define the Category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

// Define the Product schema with a reference to the Category entity
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category model
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');

// Function to create a new product
async function createProduct(req, res) {
    try {
        const { name, price, quantity, categoryId } = req.body;
        const newProduct = new Product({ name, price, quantity, category: categoryId });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllProductsWithCategory(req, res) {
    try {
        const products = await Product.find({}).populate('category');
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products with category details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Route to create a new product
app.post('/products', createProduct);

// Route to get all products with category details
app.get('/products', getAllProductsWithCategory);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
