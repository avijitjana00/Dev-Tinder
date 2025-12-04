const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const customException = require("../common/customException.js");

const ConnectionRequest = require("../models/connectionRequest.model.js");

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
            const result = await User.findOne({emailId: emailId});
            if(!result) return { error: customException.error(StatusCodes.INTERNAL_SERVER_ERROR, "User not found in database", "user not found") };
            return result;        
        } catch (err) {
            return {error: err}
        }  
    },
    getUserProfile: async function(userData) {
        return userData;
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
    },
    getPendingConnectionRequest: async function(req) {
        try {
            const loggedInUser = req.user;

            const connectinRequest = ConnectionRequest.find({
                toUserId: loggedInUser._id,
                connectionStatus: "interested"
            }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "skills"])

            if(connectinRequest) return connectinRequest;
            return [];
        } catch (e) {
            return { error: e };
        }
    },
}

