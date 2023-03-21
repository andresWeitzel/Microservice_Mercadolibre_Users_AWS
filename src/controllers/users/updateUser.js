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
} = require("../../enums/http/statusCode");
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

/**
 * @description update a user according to the parameters passed in the request body
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

    nickname = (eventBody.nickname == null || (!eventBody.nickname.length)) ? oldUser.nickname : eventBody.nickname;
    
    firstName = (eventBody.first_name == null || (!eventBody.first_name.length)) ? oldUser.first_name : eventBody.first_name;
    
    lastName = (eventBody.last_name == null || (!eventBody.last_name.length)) ? oldUser.last_name : eventBody.last_name;
    
    email = (eventBody.email == null || (!eventBody.email.length)) ? oldUser.email : eventBody.email;
    
    identType = (eventBody.identification_type == null || (!eventBody.identification_type.length)) ? oldUser.identification_type : eventBody.identification_type;

    identNumber = (eventBody.identification_number == null || (!eventBody.identification_number.length)) ? oldUser.identification_number : eventBody.identification_number;

    countryId = (eventBody.country_id == null || (!eventBody.country_id.length)) ? oldUser.country_id : eventBody.country_id;

    creationDate = (eventBody.creation_date == null || (!eventBody.creation_date.length)) ? oldUser.creation_date : eventBody.creation_date;

    
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

    if (newUser == "ECONNREFUSED") {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
        event
      );
    } else if (newUser == "ERROR") {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again",
        event
      );
    } else if (newUser == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not add user.Check the values of each attribute and try again",
        event
      );
    } else {
      newUser = await getById(userId);

      return await requestResult(statusCode.OK, newUser, event);
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