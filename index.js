const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7979; 
require('dotenv').config();

// Static files serve karo (images, CSS, etc.)
app.use(express.static(path.join(__dirname))); 

// Frontend HTML serve karo
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Product page ka route
app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, 'product.html'));
});

// Agar koi aur HTML file chahiye to generic route
app.get("/:page.html", (req, res) => {
    res.sendFile(path.join(__dirname, req.params.page + '.html'));
});

// API routes
app.use("/api", productRoutes);

// MongoDB connection
mongoose.connect(process.env.Mongo_URI)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// Local run ke liye
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Vercel ke liye export
module.exports = app;