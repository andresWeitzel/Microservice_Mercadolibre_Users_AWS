"use strict";
//Services
const {
    deleteUser
} = require("../../services/users/deleteUser");
//Enums
const {
    statusCode
} = require("../../enums/http/statusCode");
const { statusName } = require("../../enums/connection/statusName");
const { value } = require("../../enums/general/value");
//Helpers
const {
    requestResult
} = require("../../helpers/http/bodyResponse");
const {
    validateHeadersParams,
} = require("../../helpers/http/requestHeadersParams");
const {
    validateAuthHeaders
} = require("../../helpers/auth/headers");

//Const/Vars
let newUser;
let eventBody;
let eventHeaders;
let validateAuth;
let validateReqParams;
let validateReqBodyParams;
let nickname;
let firstName;
let checkDeleteUser;
let userId;
let email;
let identType;
let identNumber;
let countryId;
let creationDate;
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

        if (checkDeleteUser == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
                event
            );
        } else if (checkDeleteUser == statusName.ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again",
                event
            );
        } else if (checkDeleteUser == value.IS_NULL) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not delete a user. Check the user id and try again.",
                event
            );
        } else if (checkDeleteUser == value.IS_ZERO_NUMBER) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, a non-existent user cannot be deleted. Operation not allowed.",
                event
            );
        } else {
            return await requestResult(statusCode.OK, 'User has been deleted successfully.', event);
        }

        //-- end with db query  ---
    } catch (error) {
        msg = `Error in deleteUser lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);
    
        return await requestResult(code, msg, event);
    }
};