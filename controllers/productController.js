const productModel = require("../models/productModel");

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET product by id
const getProductsById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE product (WITH VALIDATION)
const createProduct = async (req, res) => {
    try {
        const body = req.body;
        
        // VALIDATION - Check if all required fields are present
        if (
            !body.productName ||
            !body.productPrice ||
            !body.currencyCode ||
            !body.numberOfSale ||
            !body.rating ||
            !body.isFreeShipping ||
            !body.shopName
        ) {
            return res.status(400).send({
                message: `required field missing, all fields are required: 
                productName
                productPrice
                currencyCode
                numberOfSale
                rating
                isFreeShipping
                shopName`
            });
        }

        // Create product in database
        let result = await productModel.create({
            productName: body.productName,
            productPrice: body.productPrice,
            currencyCode: body.currencyCode,
            numberOfSale: body.numberOfSale,
            rating: body.rating,
            isFreeShipping: body.isFreeShipping,
            shopName: body.shopName,
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

// DELETE product
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE product
const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductsById,
    createProduct,  
    deleteProduct,
    updateProduct
};