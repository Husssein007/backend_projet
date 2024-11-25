const express = require('express');
const brandRoutes = express.Router(); // Use express.Router() instead of express.brandRoutes()
const Brand = require('../model/brandSchema'); // Correct the path to the Brand model

// Récupérer toutes les marques
brandRoutes.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter une nouvelle marque
brandRoutes.post('/', async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    website: req.body.website,
  });

  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Récupérer une marque par ID
brandRoutes.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Marque non trouvée' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour une marque
brandRoutes.put('/:id', async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBrand) return res.status(404).json({ message: 'Marque non trouvée' });
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer une marque
brandRoutes.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Marque non trouvée' });
    res.json({ message: 'Marque supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = brandRoutes;

