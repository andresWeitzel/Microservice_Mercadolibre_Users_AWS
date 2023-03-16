"use strict";
//Services
const { getById, getByIdLimit } = require("../../services/users/getById");
//Enums
const { statusCode } = require("../../enums/http/statusCode");
//Helpers
const { requestResult } = require("../../helpers/http/bodyResponse");
const {
  validateHeadersParams,
} = require("../../helpers/http/requestHeadersParams");
const { validateAuthHeaders } = require("../../helpers/auth/headers");
const {
  validatePathParameters,
} = require("../../helpers/http/queryStringParams");
//Const/Vars
let user;
let userId;
let validateHeaders;
let validateReqParams;
let validatePathParam;

/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Object} event Object type
 * @returns a user according to his id
 */
module.exports.handler = async (event) => {
  try {
    user = null;
    userId = null;

    //-- start with validation Headers  ---

    validateReqParams = await validateHeadersParams(event);

    if (!validateReqParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check missing or malformed headers",
        event
      );
    }

    validateHeaders = await validateAuthHeaders(event);

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
    //-- end with path parameters  ---

    if (validatePathParam) {
      //-- start with db query  ---
      user = await getById(userId);
      //user = await getByIdLimit(userId);

      if (user == "ECONNREFUSED") {
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
          event
        );
      }else{
      return await requestResult(statusCode.OK, user, event);
      }
      //-- end with db query  ---
    } else {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Wrong request, check user id passed as parameter",
        event
      );
    }
  } catch (error) {
    console.log(error);
    return await requestResult(
      statusCode.INTERNAL_SERVER_ERROR,
      "The following error has been thrown" + error,
      event
    );
  }
};
