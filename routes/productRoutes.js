const express = require('express');
const Product = require('../model/product'); // Chemin vers votre modèle Product
const Category = require('../model/category'); // Chemin vers votre modèle Product

const router = express.Router();

// Créer un produit (Create)
router.post('/:idcategory', async (req, res) => {
  try {
    // Récupérer l'ID de la catégorie depuis les paramètres d'URL
    const { idcategory } = req.params;
    
    // Récupérer les autres informations du produit depuis le corps de la requête
    const { name, description, price, imageUrl, stockQuantity } = req.body;

    // Vérifier si la catégorie existe dans la base de données
    const categoryExists = await Category.findById(idcategory);
    if (!categoryExists) {
      return res.status(400).json({ message: 'La catégorie n\'existe pas.' });
    }

    // Créer un nouveau produit avec l'ID de la catégorie valide
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      category: idcategory,  // Utilisation de l'ID de la catégorie depuis l'URL
      stockQuantity,
    });

    // Sauvegarder le produit dans la base de données
    await product.save();

    // Répondre avec un message de succès
    res.status(201).json({ message: 'Produit créé avec succès !', product });
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Erreur lors de la création du produit.', error });
  }
});


// Lire tous les produits (Read all)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits.', error });
  }
});

// Lire un produit par ID (Read one)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit.', error });
  }
});
router.get('/productsbyCat/:category',async(req,res)=>{
  try {
    const catId = await Category.find({name:req.params.category});
    console.log(catId);
    
    if (!catId) {
      return res.status(404).json({ message: 'Category non trouvé.' });
      
    }
    const products = await Product.find({category : catId});
    console.log(products);

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit by category.', error });
    
  }
})

// Mettre à jour un produit (Update)
router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stockQuantity } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, category, stockQuantity },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json({ message: 'Produit mis à jour avec succès !', updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.', error });
  }
});

// Supprimer un produit (Delete)
router.delete('/products/:id', async (req, res) => {
  try {
    const {id}=req.params
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit.', error });
  }
});

module.exports = router;
