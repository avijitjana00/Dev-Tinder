const authMiddleware = require("../middleware/auth.middleware.js");
const controller = require("../controller/connectionRequest.controller.js");

module.exports  = function (router){
    router.post("/request/send/:status/:toUserId", authMiddleware.userAuthenticatoin, controller.sendConnectionRequest);
}