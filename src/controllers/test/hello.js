"use strict";
//Environment vars
const HELLO_TEST = process.env.HELLO_TEST;
//Enums
const { statusCode } = require("../../enums/http/statusCode");
//Helpers
const { requestResult } = require("../../helpers/http/bodyResponse");
const {
  validateHeadersParams,
} = require("../../helpers/http/requestHeadersParams");
const { validateAuthHeaders } = require("../../helpers/auth/headers");
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
//Const/Vars
let validate;
let validateReqParams;
let checkDbConn;

module.exports.handler = async (event) => {
  try {
    checkDbConn = await checkDbAuthentication();

    if (checkDbConn) {
      //-- start with validation Headers  ---

      validateReqParams = await validateHeadersParams(event);

      if (!validateReqParams) {
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, check missing or malformed headers",
          event
        );
      }

      validate = await validateAuthHeaders(event);

      if (!validate) {
        return await requestResult(
          statusCode.UNAUTHORIZED,
          "Not authenticated, check x_api_key and Authorization",
          event
        );
      }
      //-- end with validation Headers  ---

      return await requestResult(statusCode.OK, HELLO_TEST, event);
    } else {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
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
