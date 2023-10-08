"use strict";
//Services
const {
  getById,
  getByIdLimit
} = require("../../services/users/get-by-id");
//Enums
const {
  statusCode
} = require("../../enums/http/statusCode");
const {
  statusName
} = require("../../enums/connection/statusName");
const {
  value
} = require("../../enums/general/value");
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
const {
  validatePathParameters,
} = require("../../helpers/http/queryStringParams");

//Const/Vars
let user;
let userId;
let eventHeaders;
let validateHeaders;
let validateReqParams;
let validatePathParam;
let msg;
let code;

/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Object} event Object type
 * @returns a user according to his id
 */
module.exports.handler = async (event) => {
  try {
    user = value.IS_NULL;
    userId = value.IS_NULL;
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

    validateHeaders = await validateAuthHeaders(eventHeaders);

    if (!validateHeaders) {
      return await requestResult(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization",
        event
      );
    }
    //-- end with validation Headers  ---

    //-- start with path parameters  ---
    userId = await event.pathParameters.id;

    validatePathParam = await validatePathParameters(userId);

    if (!validatePathParam) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, the id passed as a parameter is not valid"
      );
    }
    //-- end with path parameters  ---

    //-- start with db query  ---

    user = await getById(userId);
    //user = await getByIdLimit(userId);

    switch (user) {
      case statusName.CONNECTION_REFUSED:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
        );
      case statusName.CONNECTION_ERROR:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
        );
      case value.IS_ZERO_NUMBER: 
      case value.IS_UNDEFINED:
      case value.IS_NULL:
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, could not fetch user based on id."
        );
      default:
        return await requestResult(statusCode.OK, user);
    }
    //-- end with db query  ---

  } catch (error) {
    msg = `Error in get-by-id lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(msg);

    return await requestResult(code, msg, event);

  }
};