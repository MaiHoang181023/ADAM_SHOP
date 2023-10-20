const router = require('express').Router();
const path = require('path');
const productController = require('../controller/productController.js');

router.post('/add-product', productController.addProduct);

module.exports = router;
