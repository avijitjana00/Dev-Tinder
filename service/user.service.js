const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const customException = require("../common/customException.js");
const constants = require("../common/constants.js");
const User = require("../models/users.model.js");
const userQuery = require("../queries/user.query.js");
module.exports = {
    //save user data
    createUser: async function(userData){
        try {
            const {firstName, lastName, emailId, password, age, gender, photoUrl, skills, about} = userData;
             const user = new User({
                firstName,
                lastName,
                emailId,
                password,
                age, 
                gender, 
                photoUrl,
                skills,
                about
            });

            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;

            const result = await user.save();
        
            if(!result) return { error: customException.error(StatusCodes.INTERNAL_SERVER_ERROR, "Could not save user details", constants.UNKNOWN_ERROR_MESSAGE) }; 
            return result;
        } catch (err) {
            return { error: err}
        }
    },
    login: async function(data, res){
        try {
            const {emailId, password} = data;

            const result = await userQuery.getUserByEmailId(emailId);
            //const result = await User.findOne({emailId: emailId});
            if(result){
                const isPassword  = await bcrypt.compare(password, result.password);
                if(isPassword){
                    const token = jwt.sign({_id: result._id}, "secretkey", {expiresIn: '1D'})
                    res.cookie("token", token)
                    return result;
                }else{
                    return {error: customException.error(StatusCodes.INTERNAL_SERVER_ERROR, "Invalid credentials", "Invalid credentials") }; 
                }
            }else {
               return { error: customException.error(StatusCodes.INTERNAL_SERVER_ERROR, "User not found in db", "User not found in db") }; 
            }
        } catch (err) {
            return {error: err}
        }
    },
    profileEdit: async function (user, data) {
        try {
             if (!data || Object.keys(data).length == 0) {
                 return {error: customException.error(StatusCodes.BAD_REQUEST, "No data found to be updated, please pass proper input", "No data found to be updated, please pass proper input")  };
            }

            // Update only provided keys from data
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $set: data }, { new: true }
            );
            if(updatedUser) return updatedUser;
            
        } catch (error) {
             res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error in update user profile, reason is ", error);
        }
    }
}