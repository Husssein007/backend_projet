// models/Brand.js
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String, // Assuming a URL or file path to the brand logo
    required: false,
  },
  website: {
    type: String, // Assuming a URL to the brand's website
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
