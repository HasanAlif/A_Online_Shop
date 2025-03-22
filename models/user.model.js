const bycrypt = require('bcryptjs');
const mongodb = require('mongodb');

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


    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        return db
          .getDb()
          .collection('users')
          .findOne({ _id: uid }, { projection: { password: 0 } });
      }



    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({email: this.email});
    }

    async existsAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser){
            return true;
        }else{
            return false;
        }
    }

    
    async signup(){
        const hashedPassword = await bycrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullname: this.fullname,
            address: this.address
        });
        
    }

    hasMatchingPassword(hashedPassword){
        return bycrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;
