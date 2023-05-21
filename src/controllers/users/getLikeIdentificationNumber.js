'use strict';
//Services
const {
  getLikeIdentificationNumber
} = require('../../services/users/getLikeIdentificationNumber');
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
} = require('../../helpers/http/bodyResponse');
const {
  validateHeadersParams
} = require('../../helpers/http/requestHeadersParams');
const {
  validateAuthHeaders
} = require('../../helpers/auth/headers');
const {
  validatePathParameters
} = require('../../helpers/http/queryStringParams');
//Const/Vars
let userList;
let identificationNumber;
let validate;
let eventHeaders;
let validateReqParams;
let validatePathParams;
let msg;
let code;
let queryStrParams;
let pageSizeNro;
let pageNro;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose IdentificationNumber matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = value.IS_NULL;
    identificationNumber = value.IS_NULL;
    pageSizeNro = 5;
    pageNro = value.IS_ZERO_NUMBER;
    msg = value.IS_NULL;
    code = value.IS_NULL;

    //-- start with validation Headers  ---
    eventHeaders = await event.headers;

    validateReqParams = await validateHeadersParams(eventHeaders);

    if (!validateReqParams) {
      return await requestResult(statusCode.BAD_REQUEST, 'Bad request, check missing or malformed headers', event);
    }

    validate = await validateAuthHeaders(eventHeaders);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
    //-- end with validation Headers  ---

    //-- start with path parameters  ---
    identificationNumber = await event.pathParameters.identificationNumber;

    validatePathParams = await validatePathParameters(identificationNumber);
    //-- end with path parameters  ---

    if (validatePathParams) {

      //-- start with pagination  ---
      queryStrParams = event.queryStringParameters;

      if (queryStrParams != value.IS_NULL) {
        pageSizeNro = parseInt(await event.queryStringParameters.limit);
        pageNro = parseInt(await event.queryStringParameters.page);
      }
      //-- end with pagination  ---

      //-- start with db query  ---
      userList = await getLikeIdentificationNumber(identificationNumber, pageSizeNro, pageNro, orderBy);


      if (userList == statusName.CONNECTION_REFUSED) {
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
          event
        );
      } else if (userList == statusName.CONNECTION_ERROR) {
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ERROR. An error has occurred in the process operations and queries with the database. Try again",
          event
        );
      } else if (userList == value.IS_ZERO_NUMBER || userList == value.IS_UNDEFINED || userList == value.IS_NULL) {
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, could not get paginated list of users according to identification number. Try again",
          event
        );
      } else {
        return await requestResult(statusCode.OK, userList, event);
      }
      //-- end with db query  ---

    } else {
      return await requestResult(statusCode.BAD_REQUEST, 'Wrong request, verify identification number passed as parameter', event);
    }

  } catch (error) {
    msg = `Error in getLikeIdentificationNumber lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg, event);
  }

};