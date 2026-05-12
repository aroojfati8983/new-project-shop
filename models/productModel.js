
//import mongoose from "mongoose"; 
const mongoose = require("mongoose"); 
const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    currencyCode: String,
    numberOfSale: Number,
    rating: Number,
    isFreeShipping: Boolean,
    shopName: String,
    createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model('Product', productSchema);

//export default productModel

module.exports = productModel;