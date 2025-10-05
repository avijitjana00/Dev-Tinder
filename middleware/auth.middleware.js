const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const userAuthenticatoin = async (req, res, next) =>{
    try{
        const {token} = req.cookies;
    if(!token){
        throw new error("invalid token!. Please login in");
    }
    const decodeToken =jwt.decode(token, "secretkey");
    const { _id } = decodeToken;
    if(_id){
        const user = await User.findById(_id);
        if(user){
            req.user = user;
            next();
        }
        res.status(404).send("user not found in the database");
    } else{
        throw new error("token not valid")
    }
    }catch(err){
        res.status(500).send("error in authenticate user" + err.message);
    }

}

module.exports = userAuthenticatoin;