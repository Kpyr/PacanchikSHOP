const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypto = util.promisify(crypto.scrypt);
const Storage = require('./storage');

class UsersStorage extends Storage{

    async create(user){
        const users = await this.getAll();

        const existingUser = users.find(u => u.email === user.email);

        if(existingUser){
            console.log("User with that email already exists.");
            return;
        }

        user.id = this.randomID();
        const salt = crypto.randomBytes(16).toString('hex');
        const hashed = await scrypto(user.password, salt, 64);
        const hashedPassword = hashed.toString('hex');
        const pword = `${hashedPassword}.${salt}`;
        const hashedUser = {
            ...user,
            password : pword
        }
        users.push(hashedUser);
        await this.writeAll(users);
        return hashedUser;
    }

    async comparePasswords(input, password){
        const [hashed, salt] = password.split('.');
        console.log("INPUT: ", input, "PASSWORD: ", password, "HASHED: ", hashed, "SALT: ", salt);
        const hashed2 = await scrypto(input, salt, 64);
        const hashedInput = hashed2.toString('hex');
        console.log("HASHED INPUT: ", hashedInput)
        return hashed === hashedInput;
    }

}

module.exports = new UsersStorage('users.json');