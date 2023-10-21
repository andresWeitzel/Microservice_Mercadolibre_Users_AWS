"use strict";
//Services
const { updateUser } = require("../../services/users/update");
const { getById } = require("../../services/users/get-by-id");
//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/value");
const { statusName } = require("../../enums/connection/status-name");
//Helpers
const { requestResult } = require("../../helpers/http/body-response");
const {
  validateHeadersParams,
} = require("../../helpers/http/request-headers-params");
const {
  validateBodyUpdateUserParams,
} = require("../../helpers/http/users/request-body-update-user-params");
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
let oldUser;
let userId;
let email;
let identType;
let identNumber;
let countryId;
let creationDate;
let msgResponse;
let msgLog;
let code;

/**
 * @description update a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
  try {
    //Init
    newUser = null;
    msgResponse = null;
    msgLog = null;
    code = null;

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

    if (oldUser == (0 || undefined || null)) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, check request attributes and object to update"
      );
    }

    nickname =
      eventBody.nickname == null || !eventBody.nickname.length
        ? oldUser.nickname
        : eventBody.nickname;

    firstName =
      eventBody.first_name == null || !eventBody.first_name.length
        ? oldUser.first_name
        : eventBody.first_name;

    lastName =
      eventBody.last_name == null || !eventBody.last_name.length
        ? oldUser.last_name
        : eventBody.last_name;

    email =
      eventBody.email == null || !eventBody.email.length
        ? oldUser.email
        : eventBody.email;

    identType =
      eventBody.identification_type == null ||
      !eventBody.identification_type.length
        ? oldUser.identification_type
        : eventBody.identification_type;

    identNumber =
      eventBody.identification_number == null ||
      !eventBody.identification_number.length
        ? oldUser.identification_number
        : eventBody.identification_number;

    countryId =
      eventBody.country_id == null || !eventBody.country_id.length
        ? oldUser.country_id
        : eventBody.country_id;

    creationDate =
      eventBody.creation_date == null || !eventBody.creation_date.length
        ? oldUser.creation_date
        : eventBody.creation_date;

    newUser = await updateUser(
      userId,
      nickname,
      firstName,
      lastName,
      email,
      identType,
      identNumber,
      countryId,
      creationDate
    );

    switch (newUser) {
      case statusName.CONNECTION_REFUSED:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
        );
      case statusName.CONNECTION_ERROR:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
        );
      case 0:
      case undefined:
      case null:
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
        );
      default:
        newUser = await getById(userId);

        return await requestResult(statusCode.OK, newUser);
    }
    //-- end with db query  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse = "ERROR in update lambda function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(code, msgResponse);
  }
};
