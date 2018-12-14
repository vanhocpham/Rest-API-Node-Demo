const express = require('express');
const router = express.Router();

// const mongoose = require('mongoose');
// const Product = require('../models/product');

const authCheckMiddleware = require('../middleware/auth-check');
const ProductsController = require('../controllers/products.js')

router.get('/products', ProductsController.products_get_all);
router.post('/products', authCheckMiddleware ,ProductsController.products_create_product);
router.get('/products/:productId', ProductsController.products_get_id);
router.patch('/products/:productId', authCheckMiddleware ,ProductsController.products_update_product);
router.delete('/products/:productId', authCheckMiddleware ,ProductsController.products_delete_id);


module.exports = router;