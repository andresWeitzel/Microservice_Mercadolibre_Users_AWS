"use strict";
//Services
const {
  updateUser
} = require("../../services/users/updateUser");
const {
  getById
} = require("../../services/users/getById");
//Enums
const {
  statusCode
} = require('../../enums/http/statusCode');
const {
  value
} = require('../../enums/general/value');
const {
  statusName
} = require('../../enums/connection/statusName');
//Helpers
const {
  requestResult
} = require("../../helpers/http/bodyResponse");
const {
  validateHeadersParams,
} = require("../../helpers/http/requestHeadersParams");
const {
  validateBodyUpdateUserParams,
} = require("../../helpers/http/users/requestBodyUpdateUserParams");
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
let lastName;
let oldUser;
let userId;
let email;
let identType;
let identNumber;
let countryId;
let creationDate;
let msg;
let code;

/**
 * @description update a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
  try {
    //Init
    newUser = value.IS_NULL;
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

    //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    validateReqBodyParams = await validateBodyUpdateUserParams(eventBody);

    if (!validateReqBodyParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check request attributes. Missing or incorrect",
        event
      );
    }
    //-- end with validation Body  ---

    //-- start with db query  ---

    userId = await event.pathParameters.id;

    oldUser = await getById(userId);

    if (oldUser == value.IS_ZERO_NUMBER || oldUser == value.IS_UNDEFINED || oldUser == value.IS_NULL) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, could not update an inexistent user.Check the user id and try again",
        event
      );
    }

    nickname = (eventBody.nickname == value.IS_NULL || (!eventBody.nickname.length)) ? oldUser.nickname : eventBody.nickname;
    
    firstName = (eventBody.first_name == value.IS_NULL || (!eventBody.first_name.length)) ? oldUser.first_name : eventBody.first_name;
    
    lastName = (eventBody.last_name == value.IS_NULL || (!eventBody.last_name.length)) ? oldUser.last_name : eventBody.last_name;
    
    email = (eventBody.email == value.IS_NULL || (!eventBody.email.length)) ? oldUser.email : eventBody.email;
    
    identType = (eventBody.identification_type == value.IS_NULL || (!eventBody.identification_type.length)) ? oldUser.identification_type : eventBody.identification_type;

    identNumber = (eventBody.identification_number == value.IS_NULL || (!eventBody.identification_number.length)) ? oldUser.identification_number : eventBody.identification_number;

    countryId = (eventBody.country_id == value.IS_NULL || (!eventBody.country_id.length)) ? oldUser.country_id : eventBody.country_id;

    creationDate = (eventBody.creation_date == value.IS_NULL || (!eventBody.creation_date.length)) ? oldUser.creation_date : eventBody.creation_date;

    
    newUser = await updateUser(
      userId,
      nickname,
      firstName,
      lastName,
      email,
      identType ,
      identNumber,
      countryId,
      creationDate
    );

    if (newUser == statusName.CONNECTION_REFUSED) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
        event
      );
    } else if (newUser == statusName.CONNECTION_ERROR) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again",
        event
      );
    } else if (newUser == value.IS_ZERO_NUMBER || newUser == value.IS_UNDEFINED || newUser == value.IS_NULL) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, could not update an user.Check the values of each attribute and try again",
        event
      );
    }  else {
      newUser = await getById(userId);

      return await requestResult(statusCode.OK, newUser, event);
    }

    //-- end with db query  ---
  } catch (error) {
    msg = `Error in updateUser lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg, event);
  }
};