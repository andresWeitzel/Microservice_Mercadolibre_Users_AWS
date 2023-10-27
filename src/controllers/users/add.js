"use strict";
//Services
const { addUser } = require("../../services/users/add");
//Enums
const { statusCode } = require("../../enums/http/status-code");
const { statusDetails, statusName } = require("../../enums/database/status");
//Helpers
const { requestResult } = require("../../helpers/http/body-response");
const {
  validateHeadersParams,
} = require("../../helpers/http/request-headers-params");
const {
  validateBodyAddUserParams,
} = require("../../helpers/http/users/request-body-add-user-params");
const { validateAuthHeaders } = require("../../helpers/auth/headers");
// Const
//codes
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
//connection_status
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_DETAIL_STATUS = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_DETAIL_STATUS =
  statusDetails.CONNECTION_REFUSED_DETAIL;
//Vars
let newUser;
let eventBody;
let eventHeaders;
let validateAuth;
let validateReqParams;
let validateReqBodyParams;
let nickname;
let firstName;
let lastName;
let email;
let identType;
let identNumber;
let countryId;
let code;
let msgResponse;
let msgLog;

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
  try {
    //Init
    newUser = null;
    code = null;
    msgResponse = null;
    msgLog = null;

    //-- start with validation Headers  ---
    eventHeaders = await event.headers;

    validateReqParams = await validateHeadersParams(eventHeaders);

    if (!validateReqParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check missing or malformed headers"
      );
    }

    validateAuth = await validateAuthHeaders(eventHeaders);

    if (!validateAuth) {
      return await requestResult(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization"
      );
    }
    //-- end with validation Headers  ---

    //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    validateReqBodyParams = await validateBodyAddUserParams(eventBody);

    if (!validateReqBodyParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)"
      );
    }
    //-- end with validation Body  ---

    //-- start with db query  ---

    nickname = eventBody.nickname;
    firstName = eventBody.first_name;
    lastName = eventBody.last_name;
    email = eventBody.email;
    identType = eventBody.identification_type;
    identNumber = eventBody.identification_number;
    countryId = eventBody.country_id;

    newUser = await addUser(
      nickname,
      firstName,
      lastName,
      email,
      identType,
      identNumber,
      countryId
    );

    console.log({ "NEW USER": newUser });

    switch (newUser) {
      case CONNECTION_ERROR_STATUS:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          CONNECTION_ERROR_DETAIL_STATUS
        );
      case CONNECTION_REFUSED_STATUS:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          CONNECTION_REFUSED_DETAIL_STATUS
        );
      case 0:
      case undefined:
      case null:
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
        );
      default:
        return await requestResult(statusCode.OK, newUser);
    }

    // switch (newUser) {
    //   case statusName.CONNECTION_REFUSED:
    //     return await requestResult(
    //       statusCode.INTERNAL_SERVER_ERROR,
    //       'ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques.',
    //     );
    //   case statusName.CONNECTION_ERROR:
    //     return await requestResult(
    //       statusCode.INTERNAL_SERVER_ERROR,
    //       'ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306.',
    //     );
    //   case 0:
    //   case undefined:
    //   case null:
    //     return await requestResult(
    //       statusCode.BAD_REQUEST,
    //       'Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques.',
    //     );
    //   default:
    //     return await requestResult(statusCode.OK, newUser);
    // }
    //-- end with db query  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse = "ERROR in add-user lambda function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(code, msgResponse);
  }
};
