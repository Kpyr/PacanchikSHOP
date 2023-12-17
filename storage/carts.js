const Storage = require('./storage');

class CartsStorage extends Storage {}

module.exports = new CartsStorage('carts.json');