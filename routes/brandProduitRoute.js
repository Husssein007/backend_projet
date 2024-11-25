// routes/product.js
const express = require('express');
const produitsRoute = express.Router();
const productSchema = require('../model/product');
const Brand = require('../model/brandSchema');

// Créer un nouveau produit
produitsRoute.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stockQuantity } = req.body;
    const foundCategory = await Brand.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: 'Catégorie invalide' });
    }
    const product = new productSchema({ name, description, price, imageUrl, category, stockQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir tous les produits
produitsRoute.get('/', async (req, res) => {
  try {
    const products = await productSchema.find().populate('Brand');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir les produits d'une catégorie
produitsRoute.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await productSchema.find({ Brand: req.params.BrandId }).populate('Brand');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir un produit par ID
produitsRoute.get('/:id', async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id).populate('Brand');
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
    const product = await productSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const product = await productSchema.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = produitsRoute;
