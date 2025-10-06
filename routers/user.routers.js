const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");
const userAuthenticatoin = require("../middleware/auth.middleware.js");

//signup
router.post("/signup", async (req, res) => {
    try {

        const {firstName, lastName, emailId, password, about} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword, 
            about
        });

        await user.save();

        res.send("User added successfully");

    } catch (err) {
        res.status(400).send("error in saving user details on signup" + err.message);
    }

});

//login
router.post("/login", async(req,res)=>{
    try{
        const {emailId, password} = req.body;

        const result = await User.findOne({emailId: emailId});
        if(result){
            const isPassword  = await bcrypt.compare(password, result.password);
            if(isPassword){
                const token = jwt.sign({_id: result._id}, "secretkey", {expiresIn: '1D'})
                res.cookie("token", token)
                res.status(200).send("Login successfull");
            }else{
                res.status(400).send("invalid credentials");
            }
        }else {
            res.status(404).send("data not found in the database");
        }

    }catch(err){
        res.status(500).send("error in login. reason is" +  err.message);
    }
})

//logout
router.post("/logout", async(req, res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.status(200).send("logout successful");
})

//get profile details
router.get("/user/profile/view", userAuthenticatoin, async(req, res)=>{
    try {
        const user = req.user;
        res.status(200).send(user);   
    } catch (error) {
        res.status(500).send("error in fetch profile"+ err.message);
        
    }
})

module.exports = router;