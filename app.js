const express = require("express");
const dbConnection = require("./config/dbConfiguration");
const User = require("./models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuthenticatoin = require("./middleware/auth.middleware.js");

//initilize express into app
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 7000;

//signup
app.post("/signup", async (req, res) => {
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
app.post("/login", async(req,res)=>{
    try{
        const {emailId, password} = req.body;

        const result = await User.findOne({emailId: emailId});
        if(result){
            const isPassword  = await bcrypt.compare(password, result.password);
            if(isPassword){
                const token = jwt.sign({_id: result._id}, "secretkey")
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

//get profile details
app.get("/profile", userAuthenticatoin, async(req, res)=>{
    try {
        const user = req.user;
        res.status(200).send(user);   
    } catch (error) {
        res.status(500).send("error in fetch profile"+ err.message);
        
    }
})

dbConnection().then(() => {
    console.log("DB connection has successfully established");

    app.listen(7000, () => {
        console.log(`app is listening on port http://localhost:${PORT}`);

    });

}).catch(() => {
    console.log("Not able to connect to the database");
});
