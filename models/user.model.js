const bycrypt = require('bcryptjs');

const db = require('../data/database');

class User{
    constructor(email, password, fullname, street, postal, city ){
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }
    async signup(){
        const hashedPassword = await bycrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
        
    }
}

module.exports = User;
