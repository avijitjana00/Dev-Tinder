const { StatusCodes } = require("http-status-codes");
const response = require("../common/response");
const connectionRequestService = require("../service/connectionRequest.service.js");

module.exports = {
    sendConnectionRequest: async function(req, res){
        const result = await connectionRequestService.sendConnectionRequest(req);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorCode) httpStatusCode = result.error.errorCode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.message, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(null, StatusCodes.OK, `${result.connectionStatus} connection successfully`, `${result.connectionStatus} connection successfully`));
    },
    acceptOrRejectConnectionRequest: async function(req, res){
        const result = await connectionRequestService.acceptOrRejectConnectionRequest(req);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorCode) httpStatusCode = result.error.errorCode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.message, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(null, StatusCodes.OK, `${result.connectionStatus } connection successfully`, `${result.connectionStatus } connection successfully`));
    },
}