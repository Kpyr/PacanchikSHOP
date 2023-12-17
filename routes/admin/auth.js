const express = require('express');
const usersStorage = require('../../storage/users.js');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { check, validationResult } = require('express-validator');
const {checkEmail, checkPassword, checkExistingEmail, checkExistingPassword} = require('./validators');
const {handleErrors} = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
    console.log(req.session.id);
    res.send(signupTemplate({}));
});

router.post('/signup', [checkEmail, checkPassword], handleErrors(signupTemplate), async (req, res) => {


    const { email, password } = req.body;

    
    const user = await usersStorage.create({ email, password });
 
    req.session.id = user.id;
    console.log("REQ SESSION", req.session.id);
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send("Signed Out");
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});

router.post('/signin', [checkExistingEmail, checkExistingPassword], handleErrors(signinTemplate), async (req, res) => {

    const {email} = req.body;

    const user = await usersStorage.getOneBy({email});

    req.session.id = user.id;

    res.redirect('/admin/products');
});

module.exports = router;