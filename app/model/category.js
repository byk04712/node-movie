const mongoose = require('mongoose');
const CategorySchema = require('../schema/category');

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;