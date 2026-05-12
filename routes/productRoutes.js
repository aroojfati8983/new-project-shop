// routes/productRoutes.js
const express = require('express');
const {
    getProducts,
    getProductsById,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

const router = express.Router();

// GET all products
router.get("/products", getProducts);

// GET single product
router.get("/product/:id", getProductsById);

// POST create product
router.post("/product", createProduct);

// DELETE product
router.delete("/product/:id", deleteProduct);

// PUT update product
router.put("/product/:id", updateProduct);

module.exports = router;