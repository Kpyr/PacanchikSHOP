const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersStorage = require('./storage/users.js');
const cookie = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductRouter = require('./routes/admin/products');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cookie({ keys : ['lhahaej352s']}));
app.use(authRouter);
app.use(adminProductRouter);
app.use(productRouter);
app.use(cartRouter);






app.listen(8000, () => {
    console.log("http://127.0.0.1:8000/");
});