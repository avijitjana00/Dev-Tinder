const { StatusCodes } = require("http-status-codes");
const response = require("../common/response");
const userService = require("../service/user.service");
const userQuery = require("../queries/user.query");

module.exports = {
    signUp: async function(req, res){
        const result = await userService.createUser(req.body);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorcode) httpStatusCode = result.error.errorcode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.messsage, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(result, StatusCodes.OK, "User saved successfully", "User saved successfully"));
    },
    login: async function(req, res){
        const result = await userService.login(req.body, res);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorcode) httpStatusCode = result.error.errorcode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.messsage, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(result, StatusCodes.OK, "Logged in successfully", "Logged in successfully"));
    },
    logout: async function(req, res){
        res.cookie("token", null, {expires: new Date(Date.now())});
        return res.status(StatusCodes.OK).json(response.succesWith(true, StatusCodes.OK, "Logout successful", "Logout successful"));
    },
     getUserProfile: async function(req, res){
        const result = await userQuery.getUserProfile(req.user);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorcode) httpStatusCode = result.error.errorcode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.messsage, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(result, StatusCodes.OK, "Fetch user profile details successfully", "Fetch user profile details successfully"));
    },
}