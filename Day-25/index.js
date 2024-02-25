const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');
async function createProductIndex() {
    try {
        const collection = Product.collection;
        await collection.createIndex({ name: 1 });
        console.log('Index created on the "name" field of the "Product" collection');
    } catch (error) {
        console.error('Error creating index:', error);
    }
}
createProductIndex()