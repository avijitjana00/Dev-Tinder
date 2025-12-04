const authMiddleware = require("../middleware/auth.middleware.js");
const controller = require("../controller/connectionRequest.controller.js");

module.exports  = function (router){
    //interested or rejected connection
    router.post("/request/send/:status/:toUserId", authMiddleware.userAuthenticatoin, controller.sendConnectionRequest);
    
    //accept or reject connection
    router.post("/request/review/:status/:requestId", authMiddleware.userAuthenticatoin, controller.acceptOrRejectConnectionRequest);
}