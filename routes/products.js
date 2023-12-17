const express = require('express');
const indexProductsTemplate = require('../views/products/index');
const productsStorage = require('../storage/products');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsStorage.getAll();
    res.send(indexProductsTemplate({products}));
});



module.exports = router;