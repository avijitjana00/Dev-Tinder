const authMiddleware = require("../middleware/auth.middleware.js");
const controller = require("../controller/chat.controller.js");

module.exports  = function (router){
    //fetch chat
    router.get("/chat/:targetUserId", authMiddleware.userAuthenticatoin, controller.fetchChatDetails);
}