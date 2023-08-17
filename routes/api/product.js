const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// Add new Product record
// [POST] http://localhost:6006/api/product/
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send("Add product successfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
  });

// Get all Product records
// [GET] http://localhost:6006/api/product/
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a Product record by id
// [GET] http://localhost:6006/api/product/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(404).send({ error: "Product " + id + " not found" });
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a Product record by id
// [PUT] http://localhost:6006/api/product/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).send({ error: "Product " + id + " not found" });
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a Product record by id
// [DELETE] http://localhost:6006/api/product/:id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndRemove(id);
        if (!product) return res.status(404).send({ error: "Product " + id + " not found" });
        res.send("Product " + id + " is deleted");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router