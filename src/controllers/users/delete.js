"use strict";
//Services
const {
    deleteUser
} = require("../../services/users/delete");
//Enums
const {
    statusCode
} = require("../../enums/http/status-code");
const { statusName } = require("../../enums/connection/status-name");
const { value } = require("../../enums/general/value");
//Helpers
const {
    requestResult
} = require("../../helpers/http/body-response");
const {
    validateHeadersParams,
} = require("../../helpers/http/request-headers-params");
const {
    validateAuthHeaders
} = require("../../helpers/auth/headers");

//Const/Vars
let eventHeaders;
let validateAuth;
let validateReqParams;
let checkDeleteUser;
let userId;
let msg;
let code;

/**
 * @description delete a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
    try {
        //Init
        checkDeleteUser = value.IS_NULL;
        msg = value.IS_NULL;
        code = value.IS_NULL;

        //-- start with validation Headers  ---
        eventHeaders = await event.headers;

        validateReqParams = await validateHeadersParams(eventHeaders);

        if (!validateReqParams) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, check missing or malformed headers",
                event
            );
        }

        validateAuth = await validateAuthHeaders(eventHeaders);

        if (!validateAuth) {
            return await requestResult(
                statusCode.UNAUTHORIZED,
                "Not authenticated, check x_api_key and Authorization",
                event
            );
        }
        //-- end with validation Headers  ---



        //-- start with db query  ---

        userId = await event.pathParameters.id;


        checkDeleteUser = await deleteUser(userId);


        switch (checkDeleteUser) {
            case statusName.CONNECTION_REFUSED:
              return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
              );
            case statusName.CONNECTION_ERROR:
              return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
              );
            case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
              return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, a non-existent user cannot be deleted. Operation not allowed"
              );
            default:

              return await requestResult(statusCode.OK, 'User has been deleted successfully.');
          }

        //-- end with db query  ---
    } catch (error) {
        msg = `ERROR in delete-user lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(msg);
    
        return await requestResult(code, msg, event);
    }
};