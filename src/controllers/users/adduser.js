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
let body;
let headers;
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
    body = await JSON.parse(event.body);

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

    validateReqBodyParams = await validateBodyAddUserParams(body);

    if (!validateReqBodyParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check request attributes. Missing or incorrect",
        event
      );
    }
    //-- end with validation Body  ---

    //-- start with db query  ---

    nickname = body.nickname;
    firstName = body.first_name;
    lastName = body.last_name;
    email = body.email;
    identType = body.identification_type;
    identNumber = body.identification_number;
    countryId = body.country_id;

    newUser = addUser(
      nickname,
      firstName,
      lastName,
      email,
      identType,
      identNumber,
      countryId
    );
    if (newUser == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not add user. Try again",
        event
      );
    }

    return await requestResult(statusCode.OK, newUser, event);
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
