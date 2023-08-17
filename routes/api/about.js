//events
const express = require('express');
const router = express.Router();

const About = require('../../models/about');

router.post('/', async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).send(event);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const about = await About.find();
      res.send(about);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).send({ error: "Event not found" });
      res.send(event);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!event) return res.status(404).send({ error: "Event not found" });
      res.send(event);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const event = await Event.findByIdAndRemove(req.params.id);
      if (!event) return res.status(404).send({ error: "Event not found" });
      res.send(event);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  module.exports = router