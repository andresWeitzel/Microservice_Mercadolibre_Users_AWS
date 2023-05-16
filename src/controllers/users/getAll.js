"use strict";
//Services
const {
  getAll,
  getAllWithoutDate
} = require("../../services/users/getAll");
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
//Const/Vars
let userList;
let eventHeaders;
let validateReqParams;
let validateAuth;
let queryStrParams;
let pageSizeNro;
let pageNro;
let msg;
let code;
const orderBy = [
  ["id", "ASC"]
];

/**
 * @description gets all paged users
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    //Init
    userList = value.IS_NULL;
    msg = value.IS_NULL;
    code = value.IS_NULL;
    pageSizeNro = 5;
    pageNro = value.IS_ZERO_NUMBER;


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

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != value.IS_NULL) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      pageNro = parseInt(await event.queryStringParameters.page);
    }
    //-- end with pagination  ---

    //-- start with db query  ---
    userList = await getAll(pageSizeNro, pageNro, orderBy);
    // userList = await getAllWithoutDate(pageSizeNro, pageNro, orderBy);

    if (userList == statusName.CONNECTION_REFUSED) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
        event
      );
    } else if (userList == statusName.ERROR) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again",
        event
      );
    } else if (userList == value.IS_ZERO_NUMBER || userList == value.IS_NULL) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, could not get the paginated list of users.",
        event
      );
    } else {
      return await requestResult(statusCode.OK, userList, event);
    }
    //-- end with db query  ---

  } catch (error) {

    msg = `Error in getAll lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg, event);

  }
};