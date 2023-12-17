const express = require('express');
const cartsStorage = require('../storage/carts');
const productsStorage = require('../storage/products');
const showCartTemplate = require('../views/cart/show');

const router = express.Router();

//show items
router.get('/cart', async (req, res) =>{
    if(!req.session.cartId){
        return res.redirect('/');
    }

    const cart = await cartsStorage.getOne(req.session.cartId);

    for(let item of cart.items){
        const product = await productsStorage.getOne(item.id);

        item.product = product;
    }

    res.send(showCartTemplate({items : cart.items}));

});

//add item
router.post('/cart/products', async (req, res) => {
    
    let cart;
    if(!req.session.cartId){
        cart = await cartsStorage.create({ items: []});
        req.session.cartId = cart.id;
    }
    else{
        cart = await cartsStorage.getOne(req.session.cartId);
    }
    
    const existingItem = cart.items.find(item => item.id === req.body.productId);

    if(existingItem){
        existingItem.quantity++;
    }
    else{
        cart.items.push({id: req.body.productId, quantity: 1});
    }

    await cartsStorage.update(cart.id, {items: cart.items});

    res.redirect('/');

});

//delete item
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsStorage.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsStorage.update(req.session.cartId, {items});

    res.redirect('/cart');
});

module.exports = router;