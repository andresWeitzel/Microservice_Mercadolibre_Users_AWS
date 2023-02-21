//Environment vars
const X_API_KEY=process.env.X_API_KEY;
const BEARER_TOKEN=process.env.BEARER_TOKEN;
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../http/bodyResponse');
//Const/vars
let validate;

/**
 * @description check the x-api-key and the bearer token. In case they are not correct, we return false
 * @param {String} xApiKey String type
 * @param {String} authorization String type
 * @returns a boolean
 */
const validateAuthHeaders = async (xApiKey,authorization) => {
    validate=true;
    if(xApiKey != X_API_KEY
        || authorization != BEARER_TOKEN
        || authorization == null){   
        validate = false;
      }
    return validate;
}

module.exports = { validateAuthHeaders }