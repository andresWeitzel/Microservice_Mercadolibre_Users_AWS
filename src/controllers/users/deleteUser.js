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
        delUser = null;

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

        if (delUser == "ECONNREFUSED") {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
                event
            );
        } else if (delUser == "ERROR") {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again",
                event
            );
        } else if (delUser == null) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not add user.Check the values of each attribute and try again",
                event
            );
        } else {

            return await requestResult(statusCode.OK, 'Se ha eliminado el usuario correctamente', event);
        }

        //-- end with db query  ---
    } catch (error) {
        console.log(error);
        return await requestResult(
            statusCode.INTERNAL_SERVER_ERROR,
            "The following error has been thrown" + error,
            event
        );
    }
};