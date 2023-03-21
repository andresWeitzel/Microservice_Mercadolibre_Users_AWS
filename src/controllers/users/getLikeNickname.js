'use strict';
//Services
const {
  getLikeNickname
} = require('../../services/users/getLikeNickname');
//Enums
const {
  statusCode
} = require('../../enums/http/statusCode');
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
let nickname;
let eventHeaders;
let validate;
let validateReqParams;
let validatePathParams;
let queryStrParams;
let pageSizeNro;
let pageNro;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose nickname matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    nickname = null;
    pageSizeNro=5;
    pageNro=0;

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
    nickname = await event.pathParameters.nickname;

    validatePathParams = await validatePathParameters(nickname);
    //-- end with path parameters  ---

    if (validatePathParams) {

      //-- start with pagination  ---
      queryStrParams = event.queryStringParameters;

      if (queryStrParams != null) {
        pageSizeNro = parseInt(await event.queryStringParameters.limit);
        pageNro = parseInt(await event.queryStringParameters.page);
      }
      //-- end with pagination  ---

      //-- start with db query  ---
      userList = await getLikeNickname(nickname, pageSizeNro, pageNro, orderBy);

      if (userList == "ECONNREFUSED") {
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available",
          event
        );
      } else if (userList == "ERROR") {
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ERROR. An error has occurred in the process operations and queries with the database. Try again",
          event
        );  
      }else {
        return await requestResult(statusCode.OK, userList, event);
      }
      //-- end with db query  ---

    } else {
      return await requestResult(statusCode.BAD_REQUEST, 'Wrong request, verify nickname passed as parameter', event);
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