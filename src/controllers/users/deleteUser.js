"use strict";
//Services
const {
    deleteUser
} = require("../../services/users/deleteUser");
const {
    getById
} = require("../../services/users/getById");
//Enums
const {
    statusCode
} = require("../../enums/http/statusCode");
const { statusName } = require("../../enums/connection/statusName");
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
let delUser;
let userId;
let email;
let identType;
let identNumber;
let countryId;
let creationDate;

/**
 * @description delete a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
    try {
        //Init
        delUser = value.IS_NULL;

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


        delUser = await deleteUser(userId);

        if (delUser == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
                event
            );
        } else if (delUser == statusName.ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again",
                event
            );
        } else if (delUser == IS_NULL) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not delete a user. Check the user id and try again.",
                event
            );
        } else if (delUser == 0) {
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