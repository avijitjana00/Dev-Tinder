const express = require("express");
const dbConnection = require("./config/dbConfiguration");
const User = require("./models/users.model.js");

//initilize express into app
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 7000;


app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        res.send("User added successfully");

    } catch (err) {
        res.status(400).send("error in saving user details on signup", err.message);
    }

});

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
        res.status(400).send("error in fetching user details", err.message);
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
