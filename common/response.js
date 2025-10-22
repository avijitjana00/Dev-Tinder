const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const constants = require("./constants");

module.exports = {
    succesWith: (data, httpStatusCode, message, displayMessage, customStatusCode, customData) => {
        if (!data) {
            data = null;
        }
        if (!httpStatusCode) {
            httpStatusCode = StatusCodes.OK;
        }
        if (!message) {
            message = null;
        }
        if (!displayMessage) {
            displayMessage = constants.UNKNOWN_ERROR_MESSAGE;
        }
        if(!customStatusCode){
            customStatusCode = null;
        }
        if(!customData){
            customData = null;
        }
        return {
            httpStatusCode,
            customStatusCode,
            result: { data, customData},
            message,
            displayMessage,
            statu: ReasonPhrases.OK
        };
    },
    errorWith: (httpStatusCode, message, displayMessage) => {
        if (!httpStatusCode) {
            httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        }
        if (!message) {
            message = null;
        }
        if (!displayMessage) {
            displayMessage = constants.UNKNOWN_ERROR_MESSAGE;
        }
        return {
            httpStatusCode,
            result: data,
            message,
            displayMessage,
            statu: 'Failure'
        };
    }
};