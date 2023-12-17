const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypto = util.promisify(crypto.scrypt);

module.exports = class Storage{
    constructor(filename){
        if(!filename){
            throw new Error('Must specify a filename for users to be stored in.');
        }

        this.filename = filename;

        try{
            fs.accessSync(this.filename);
        }
        catch(err){
            fs.writeFileSync(this.filename, '[]');
            console.log("File doesn't exists. Created a new file.");
        }
    }

    async getAll(){
        return JSON.parse(await fs.promises.readFile(this.filename));
    }

    async writeAll(users){
        await fs.promises.writeFile(this.filename, JSON.stringify(users, null, 2));
    }

    async create(attrs){
        attrs.id = this.randomID();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
    }

    randomID(){
        return crypto.randomBytes(6).toString('hex');
    }

    async deleteAll(){
        await fs.promises.writeFile(this.filename, '[]');
        console.log("ALL USERS HAVE BEEN DELETED.");
    }

    async getOneBy(filter){
        const users = await this.getAll();

        for(let user of users){
            for(let key in filter){
                if(user[key] === filter[key]){
                    return user;
                }
            }
        }
    }

    async getOne(id){
        const users = await this.getAll();
        
        const existingUser = users.find(u => u.id === id);

        if(existingUser){
            return existingUser;
        }
    }

    async update(id, attributes){
        const users = await this.getAll();
        const user = users.find(u => u.id === id);

        if(!user){
            throw new Error(`User with ID: ${id} doesn't exists.`);
        }

        Object.assign(user, attributes);
        await this.writeAll(users);
    }

    async delete(id){
        const users = await this.getAll();

        const filteredUsers = users.filter(user => user.id !== id);
        
        await this.writeAll(filteredUsers);
    }
}