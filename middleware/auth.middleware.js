const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { StatusCodes } = require("http-status-codes");
const response = require("../common/response.js");

const userAuthenticatoin = async (req, res, next) =>{
    try{
        const {token} = req.cookies;
    if(!token){
        throw new Error("invalid token!. Please login in");
    }
    const decodeToken =jwt.decode(token, process.env.SECRET_KEY);
    const { _id } = decodeToken;
    if(_id){
        const user = await User.findById(_id);
        if(user){
            req.user = user;
            return next();
        }
        res.status(StatusCodes.NOT_FOUND).json(response.errorWith(StatusCodes.NOT_FOUND, "user not found in the database", "user not found"));
    } 
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error in authenticate user " + err.message);
    }

}

module.exports = {
    userAuthenticatoin
};