const Product = require('../model/product');

// Fonction pour créer un produit
exports.createProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save()
    .then(product => res.status(201).json(product))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Fonction pour obtenir tous les produits
exports.getAllProducts = (req, res) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Fonction pour obtenir un produit par ID
exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) return res.status(404).json({ error: 'Produit non trouvé' });
      res.status(200).json(product);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Fonction pour mettre à jour un produit
exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProduct => {
      if (!updatedProduct) return res.status(404).json({ error: 'Produit non trouvé' });
      res.status(200).json(updatedProduct);
    })
    .catch(err => res.status(400).json({ error: err.message }));
};

// Fonction pour supprimer un produit
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Produit supprimé avec succès' }))
    .catch(err => res.status(500).json({ error: err.message }));
};
