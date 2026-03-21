require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConfiguration");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = express.Router();

const http = require("http");
const initializeSocket = require("./utils/chatServer.js");

//initilize express into app
const app = express();

app.use(cors({
    origin: process.env.DOMAIN,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);
const PORT = process.env.PORT || 7000;

require("./routers/user.routers.js")(router);
require("./routers/connectionRequest.router.js")(router);

app.use("/", router);

const server = http.createServer(app);
initializeSocket(server);


dbConnection().then(() => {
    console.log("DB connection has successfully established");

    server.listen(process.env.PORT, () => {
        console.log(`app is listening on port http://localhost:${PORT}`);

    });

}).catch(() => {
    console.log("Not able to connect to the database");
});
