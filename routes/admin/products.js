const express = require('express');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const {checkTitle, checkPrice, checkPassword} = require('./validators');
const productsStorage = require('../../storage/products');
const productsTemplate = require('../../views/admin/products/index');
const newProductTemplate = require('../../views/admin/products/new');
const editProductTemplate = require('../../views/admin/products/edit');
const { requireAuth, handleErrors } = require('./middlewares');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsStorage.getAll();
    res.send(productsTemplate({products}));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/products/new', requireAuth, upload.single('image'), [checkTitle, checkPrice], handleErrors(newProductTemplate),
 async (req, res) => {


    const {title, price} = req.body;
    let img = '';
     console.log("LOL");

    if(req.file){
        img = req.file.buffer.toString('base64');
        console.log(img);
    }

    const prod = await productsStorage.create({title, price, img});

    console.log(prod);
    res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await productsStorage.getOne(req.params.id);
    console.log(product);
    res.send(editProductTemplate({product}));
});

router.post('/admin/products/:id/edit', requireAuth, upload.single('image'),[checkTitle, checkPrice], handleErrors(editProductTemplate, async req => {
    const product = await productsStorage.getOne(req.params.id);
    return {product};
}), async (req, res) => {

    await productsStorage.update(req.params.id, req.body);
    res.redirect('/admin/products');
});

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
    await productsStorage.delete(req.params.id);
    res.redirect('/admin/products');
});



module.exports = router;