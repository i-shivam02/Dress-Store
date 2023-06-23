const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    published: Boolean,
    category: String
})

const product = mongoose.model("Product", productSchema);

module.exports = product;