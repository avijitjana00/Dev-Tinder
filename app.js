require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConfiguration");
const cookieParser = require("cookie-parser");
const router = express.Router();

//initilize express into app
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 7000;

require("./routers/user.routers.js")(router);
require("./routers/connectionRequest.router.js")(router);

dbConnection().then(() => {
    console.log("DB connection has successfully established");

    app.listen(7000, () => {
        console.log(`app is listening on port http://localhost:${PORT}`);

    });

}).catch(() => {
    console.log("Not able to connect to the database");
});
