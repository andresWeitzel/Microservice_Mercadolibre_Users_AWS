'use strict';
//Services
const { addUser
} = require('../../services/users/addUser');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateHeadersParams } = require('../../helpers/http/requestHeadersParams');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let user;
let validate;
let validateReqParams;

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
    try {
        //Init 
        user = null;

        //-- start with validation Headers  ---
        validateReqParams = await validateHeadersParams(event);

        if (!validateReqParams) {
          return await requestResult(statusCode.BAD_REQUEST, 'Bad request, check missing or malformed headers', event);
        }

        validate = await validateAuthHeaders(event);

        if (!validate) {
            return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
        }
        //-- end with validation Headers  ---


        //-- start with db query  ---

        // user = await addUser('a', 'a', 'a', 'a', 'a', 'a', 'a');

        return await requestResult(statusCode.OK, user, event);
        //-- end with db query  ---

    } catch (error) {
        console.log(error);
    }

};
