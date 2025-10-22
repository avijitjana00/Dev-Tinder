const Joi = require("joi");
const constants = require("../common/constants.js");

module.exports = {
    loginValidate,
    validateProfileUpdate
}

function validateProfileUpdate(req, res, next){
    const request = Joi.object({
        firstName: Joi.string().not(null).optional(),
        lastName: Joi.string().allow(null).optional(),
        age: Joi.number().not(0).positive().optional(),
        photoUrl: Joi.string().allow(null).optional(),
        skills: Joi.array().items(Joi.string().required()).optional().allow(null),
        about: Joi.string().allow(null).optional()
    })
    const {error} = request.validate(req.body);

    if(error){
        let errorMessage = error.details[0].context.label;
        let displayMessage = errorMessage;

        if(["firstName", "lastName", "age", "photoUrl", "skills", "about"].includes(errorMessage) || error.details[0].type === "object.allowUnknown"){
            displayMessage = constants.BAD_REQUEST;
        }
        if(!errorMessage){
            displayMessage = constants.INVALID_DATA_STRING;
        }
        return res;
    }
    next();
}

function loginValidate(req, res, next){
    const request = Joi.object({
        emailId: Joi.string().required(),
        password: Joi.string().required()
    })
    const {error} = request.validate(req.body);

    if(error){
        let errorMessage = error.details[0].context.label;
        let displayMessage = errorMessage;

        if(["emailId", "password"].includes(errorMessage) || error.details[0].type === "object.allowUnknown"){
            displayMessage = constants.BAD_REQUEST;
        }
        if(!errorMessage){
            displayMessage = constants.INVALID_DATA_STRING;
        }
        return res;
    }
    next();
}