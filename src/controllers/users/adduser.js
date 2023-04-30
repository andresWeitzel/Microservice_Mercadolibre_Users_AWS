"use strict";
//Services
const { addUser } = require("../../services/users/addUser");
//Enums
const { statusCode } = require("../../enums/http/statusCode");
//Helpers
const { requestResult } = require("../../helpers/http/bodyResponse");
const {
  validateHeadersParams,
} = require("../../helpers/http/requestHeadersParams");
const {
  validateBodyAddUserParams,
} = require("../../helpers/http/users/requestBodyAddUserParams");
const { validateAuthHeaders } = require("../../helpers/auth/headers");

//Const/Vars
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

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
  try {
    //Init
    newUser = null;

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

    //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    validateReqBodyParams = await validateBodyAddUserParams(eventBody);

    if (!validateReqBodyParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check request attributes. Missing or incorrect",
        event
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
    if (newUser == "ECONNREFUSED") {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
        event
      );
    }
    else if (newUser == "ERROR") {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again",
        event
      );
    }
    else if (newUser == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not add user. Check the values of each attribute and try again",
        event
      );
    }else{
    return await requestResult(statusCode.OK, newUser, event);
  }

    //-- end with db query  ---
  } catch (error) {
    msg = `Error in addUser lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg, event);
  }
};
