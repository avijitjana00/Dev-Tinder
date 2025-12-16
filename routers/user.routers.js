const authMiddleware = require("../middleware/auth.middleware.js");
const controller = require("../controller/user.controller.js");
const validator = require("../validator/user.validator.js");


module.exports  = function (router){
    //signup
    router.post("/signup", controller.signUp);

    //login
    router.post("/login", validator.loginValidate, controller.login);

    //logout
    router.post("/logout", controller.logout);

    //fetch user details
    router.get("/profile/view", authMiddleware.userAuthenticatoin, controller.getUserProfile);

    //edit user profile
    router.patch("/profile/edit", authMiddleware.userAuthenticatoin, validator.validateProfileUpdate, controller.profileEdit);

    //get pending connection request
    router.get("/user/pending/request", authMiddleware.userAuthenticatoin, controller.getPendingConnectionRequest);

    //get user connections
    router.get("/user/connection", authMiddleware.userAuthenticatoin, controller.getUserConnection);

    // user feed
    router.get("/feed", authMiddleware.userAuthenticatoin, controller.getUserFeed);
}