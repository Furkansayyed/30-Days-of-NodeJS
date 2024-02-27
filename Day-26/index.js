
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');
const Product = mongoose.model('Product', productSchema);

async function executeAggregationPipeline() {
    try {
        const pipeline = [

            { $group: { _id: null, totalProducts: { $sum: 1 } } },

            { $group: { _id: null, avgPrice: { $avg: '$price' } } },

            { $sort: { quantity: -1 } },
            { $limit: 1 }
        ];

        const results = await Product.aggregate(pipeline);

        console.log('Product Statistics:', results);
    } catch (error) {
        console.error('Error executing aggregation pipeline:', error);
    }
}

executeAggregationPipeline()