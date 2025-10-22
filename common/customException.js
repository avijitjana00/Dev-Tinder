const { StatusCodes } = require("http-status-codes");

module.exports = {
    error: (errorCode, message, displayMessage, customStatusCode, customData) =>{
        if(!errorCode) errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
        if(!customStatusCode) return { errorCode, message, displayMessage} ;
        if(customStatusCode){
            return {
                errorCode,
                message,
                displayMessage,
                customStatusCode,
                customData
            }
        }
    }
}

// module.exports = {
//     error: (errorCode, message, displayMessage, customStatusCode, customData) => {
//         if (!errorCode) errorCode = StatusCodes.INTERNAL_SERVER_ERROR;

//         // Always return a consistent object
//         return {
//             errorCode,
//             message,
//             displayMessage,
//             customStatusCode: customStatusCode || null,
//             customData: customData || null
//         };
//     }
// };