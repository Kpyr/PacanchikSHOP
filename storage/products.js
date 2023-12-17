const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypto = util.promisify(crypto.scrypt);
const Storage = require('./storage');

class ProductsStorage extends Storage {}

module.exports = new ProductsStorage('products.json');