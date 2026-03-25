const { StatusCodes } = require("http-status-codes");
const chatQuery = require("../queries/chat.query");
const response = require("../common/response");

module.exports ={
    fetchChatDetails: async function(req, res){
        const result = await chatQuery.fetchChatDetails(req);
        if(result?.error){
            let httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            if(result.error.errorcode) httpStatusCode = result.error.errorcode;
            res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.messsage, result.error.displayMessage))
        } else return res.status(StatusCodes.OK).json(response.succesWith(result, StatusCodes.OK, "Fetch chat successfully", "Fetch chat successfully"));
    }
}