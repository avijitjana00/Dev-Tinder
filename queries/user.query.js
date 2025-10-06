const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");

module.exports = {
    //get user details by Id
    getUserById: async function(userId) {
        try {
            const result = User.findById(userId);
            if(!result) throw new Error("User not found in database");
            return result;        
        } catch (error) {
            res.status(500).send("error in fetch user details by Id"+ error.messsage);
        }  
    },

    //get user detials by emailId
    getUserByEmailId: async function(emailId) {
        try {
            const result = User.findById(emailId);
            if(!result) throw new Error("User not found in database");
            return result;        
        } catch (error) {
            res.status(500).send("error in fetch user details by emailId"+ error.messsage);
        }  
    },
    vlidatePassword: async function(emailId, password){
        try {
            const result = this.getUserByEmailId(emailId);
        if(result){
            const validatePassword = await bcrypt.compare(password, result.password);
            if(validatePassword){
                return true;
            } else{
                return false;
            } 
        } else{
            throw new Error("user not found in database by provided emailId")
        }
        } catch (error) {
             throw new Error("error in validating password" + error.messsage);
        }
    }
}

