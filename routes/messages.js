// routes/contact.js
const express = require('express');
const messageRoute = express.Router();
const ContactMessage = require('../model/message');

// Route pour envoyer un message (POST)
messageRoute.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage = new ContactMessage({ name, email, phone, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour obtenir tous les messages (GET)
messageRoute.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir un message par ID (GET /:id)
messageRoute.get('/:id', async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour supprimer un message (DELETE /:id)
messageRoute.delete('/:id', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = messageRoute;
