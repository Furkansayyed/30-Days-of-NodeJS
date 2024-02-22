const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');

async function createProduct(req, res) {
    try {
        const { name, price, quantity } = req.body;
        const newProduct = new Product({ name, price, quantity });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, quantity }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

app.post('/create-products', createProduct);

app.get('/products', getAllProducts);

app.put('/update-products/:id', updateProduct);

app.delete('/products/:id', deleteProduct);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
