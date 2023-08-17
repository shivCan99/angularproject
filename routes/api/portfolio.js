const express = require('express');
const router = express.Router();

const Portfolio = require('../../models/Portfolio');

router.post('/', async (req, res) => {
    try {
      const portfolio = new Portfolio(req.body);
      await portfolio.save();
      res.status(201).send(portfolio);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const portfolios = await Portfolio.find();
      res.send(portfolios);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) return res.status(404).send({ error: "Portfolio not found" });
      res.send(portfolio);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
      const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!portfolio) return res.status(404).send({ error: "Portfolio not found" });
      res.send(portfolio);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const portfolio = await Portfolio.findByIdAndRemove(req.params.id);
      if (!portfolio) return res.status(404).send({ error: "Portfolio not found" });
      res.send(portfolio);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

module.exports = router;