// routes/product.js
const express = require('express');
const produitsRoute = express.Router();
const Product = require('../model/product');
const Category = require('../model/categorySchema');

// Créer un nouveau produit
produitsRoute.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stockQuantity } = req.body;
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: 'Catégorie invalide' });
    }
    const product = new Product({ name, description, price, imageUrl, category, stockQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir tous les produits
produitsRoute.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir les produits d'une catégorie
produitsRoute.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir un produit par ID
produitsRoute.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour un produit
produitsRoute.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer un produit
produitsRoute.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = produitsRoute;
