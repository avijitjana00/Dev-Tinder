const express = require("express");
const dbConnection = require("./config/dbConfiguration");
const User = require("./models/users.model.js");
const bcrypt = require("bcrypt");

//initilize express into app
const app = express();

app.use(express.json());

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

//get user details by emailId
app.get("/user", async (req, res) => {
    const user = req?.body?.emailId;
    try {
        const result = await User.find({ emailId: user });
        console.log(result);

        if (result?.length === 0) {
            res.status(404).send("details not found", "use details not found based on emailId");
        }
        res.send("successfully fetched user details by emailId", result[0]);

    } catch (err) {
        res.status(400).send("error in fetching user details" + err.message);
    }

});

//update user data by emailId
app.patch("/user/update", async (req, res) => {
    const userEmailId = req.body.emailId;
    const userFirstName = req.body.firstName;

    try {
        if (userEmailId) {
            const result = User.updateOne({ emailId: userEmailId }, { firstName: userFirstName });
            if (!result) res.status(404).send("could not update user details" + result.err);
            res.status(200).send("user data updated successfully");
        } else {
            res.status(400).send("emailId should be required to update user data");
        }
    } catch (err) {
        res.status(500).send("internal server error" + err.message);
    }
});

dbConnection().then(() => {
    console.log("DB connection has successfully established");

    app.listen(7000, () => {
        console.log(`app is listening on port http://localhost:${PORT}`);

    });

}).catch(() => {
    console.log("Not able to connect to the database");
});
