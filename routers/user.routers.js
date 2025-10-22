const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");
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
}