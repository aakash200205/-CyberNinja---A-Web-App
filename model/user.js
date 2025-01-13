
const db = require('../database/database');

const bcrypt = require('bcryptjs');

class User{

    constructor(email,password,fullname, address ,pincode,city){
        this.email=email;
        this.password=password;
        this.name=fullname;
        this.location={
            address:address,
            pincode:pincode,
            city:city
        }

    }

    getUserWithSameEmail(){
        return db.checkdb().collection('users').findOne({email : this.email});
    }

    async existsAlready(){
       const existingUser = await this.getUserWithSameEmail();
       if(existingUser){
        return true;
       }else{
        return false;
       }
    }


  async insertTodb(){
        const hashedPassword=await bcrypt.hash(this.password , 12);  //async operation => hash and insertOne

    await db.checkdb().collection('users').insertOne({
        email:this.email,
        password:hashedPassword,
        name:this.name,
        address:this.location
    });
    
 }

 hasMatchingPassword(){
    return bcrypt.compare(this.password,hashedPassword);
 }

}

module.exports = User;