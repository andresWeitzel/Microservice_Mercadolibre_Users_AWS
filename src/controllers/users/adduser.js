//"use strict";
// //Services
// const { addUser } = require("../../services/users/addUser");
//Models
import UserDto from "../../models/dto/userDto.ts";
//import { UserDto } from "../../models/dto/user-dto";
//Enums
import { statusCode } from "../../enums/http/statusCode";
// const { statusName } = require("../../enums/connection/statusName");
import { value } from "../../enums/general/value";
//Helpers
import { requestResult } from "../../helpers/http/bodyResponse";
import { validateHeadersParams } from "../../helpers/http/requestHeadersParams";
// const {
//   validateClass,
// } = require("../../helpers/class-validator/validate-properties");
// const {
//   validateBodyAddUserParams,
// } = require("../../helpers/http/users/requestBodyAddUserParams");
import { validateAuthHeaders } from "../../helpers/auth/headers";
import { currentDateTime } from "../../helpers/dates/date";

//Const/Vars
let newUser;
let eventBody;
let eventHeaders;
let validateAuth;
let validateReqParams;
let validateReqBodyParams;
let validateObject;
let nickname;
let firstName;
let lastName;
let email;
let identType;
let identNumber;
let dateNow;
let countryId;
let msg;
let code;

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
export async function handler(event) {
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

    // //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    // validateReqBodyParams = await validateBodyAddUserParams(eventBody);

    // if (!validateReqBodyParams) {
    //   return await requestResult(
    //     statusCode.BAD_REQUEST,
    //     "Bad request, check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)"
    //   );
    // }
    // //-- end with validation Body  ---

    //-- start with db query  ---

    nickname = eventBody?.nickname;
    firstName = eventBody?.first_name;
    lastName = eventBody?.last_name;
    email = eventBody?.email;
    identType = eventBody?.identification_type;
    identNumber = eventBody?.identification_number;
    countryId = eventBody?.country_id;
    dateNow = await currentDateTime();
    creationDate = dateNow;
    updateDate = dateNow;

    newUser = new UserDto(
      nickname,
      firstName,
      lastName,
      email,
      identType,
      identNumber,
      countryId,
      creationDate,
      updateDate
    );

    return await requestResult(statusCode.OK, newUser);

    // //-- start with validation object  ---
    // validateObject = await validateClass(newUser);

    // if (validateObject.length) {
    //   return await requestResult(
    //     statusCode.BAD_REQUEST,
    //     `Bad request, check request attributes. Validate the following : ${validateObject}`
    //   );
    // }
    // return await requestResult(
    //   statusCode.OK,
    //   newUser
    // );
    //-- end with validation object  ---

    // switch (newUser) {
    //   case statusName.CONNECTION_REFUSED:
    //     return await requestResult(
    //       statusCode.INTERNAL_SERVER_ERROR,
    //       "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
    //     );
    //   case statusName.CONNECTION_ERROR:
    //     return await requestResult(
    //       statusCode.INTERNAL_SERVER_ERROR,
    //       "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
    //     );
    //   case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
    //     return await requestResult(
    //       statusCode.BAD_REQUEST,
    //       "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
    //     );
    //   default:
    //     return await requestResult(statusCode.OK, newUser);
    // }
    //-- end with db query  ---
  } catch (error) {
    msg = `Error in addUser lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(msg);

    return await requestResult(code, msg, event);
  }
}
