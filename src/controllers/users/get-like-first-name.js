'use strict';
//Services
const {
  getLikeFirstName,
} = require('../../services/users/get-like-first-name');
//Enums
const { statusCode } = require('../../enums/http/status-code');
const { statusName } = require('../../enums/connection/status-name');
//Helpers
const { requestResult } = require('../../helpers/http/body-response');
const {
  validateHeadersParams,
} = require('../../helpers/http/request-headers-params');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../../helpers/pagination/users/order');

//Const/Vars
let userList;
let userName;
let validate;
let eventHeaders;
let validateReqParams;
let validatePathParam;
let queryStrParams;
let pageSizeNro;
let pageNro;
let msgResponse;
let msgLog;
let code;
let orderAt;
let orderBy;
let order;

/**
 * @description get all paged users whose first name matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    userName = null;
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgResponse = null;
    msgLog = null;
    code = null;

    //-- start with validation Headers  ---
    eventHeaders = await event.headers;

    validateReqParams = await validateHeadersParams(eventHeaders);

    if (!validateReqParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        'Bad request, check missing or malformed headers',
        event,
      );
    }

    validate = await validateAuthHeaders(eventHeaders);

    if (!validate) {
      return await requestResult(
        statusCode.UNAUTHORIZED,
        'Not authenticated, check x_api_key and Authorization',
        event,
      );
    }
    //-- end with validation Headers  ---

    //-- start with path parameters  ---
    userName = await event.pathParameters.firstName;

    validatePathParam = await validatePathParameters(userName);

    if (!validatePathParam) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        'Bad request, the first name passed as a parameter is not valid',
      );
    }
    //-- end with path parameters  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != null) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      pageNro = parseInt(await event.queryStringParameters.page);
      pageNro = event.queryStringParameters.page
        ? parseInt(await event.queryStringParameters.page)
        : pageNro;
      orderBy = event.queryStringParameters.orderBy
        ? event.queryStringParameters.orderBy
        : orderBy;
      orderAt = event.queryStringParameters.orderAt
        ? event.queryStringParameters.orderAt
        : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        'It is not possible to apply sorting based on the requested orderBy value. Invalid field',
        event,
      );
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        'It is not possible to apply sorting based on the requested orderAt value. Invalid field',
        event,
      );
    }

    order = [[orderBy, orderAt]];
    //-- end with pagination  ---

    //-- start with db query  ---
    userList = await getLikeFirstName(userName, pageSizeNro, pageNro, order);

    switch (userList) {
      case statusName.CONNECTION_REFUSED:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          'ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available',
        );
      case statusName.CONNECTION_ERROR:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          'ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306.',
        );
      case 0:
      case undefined:
      case null:
        return await requestResult(
          statusCode.BAD_REQUEST,
          'Bad request, could not get paginated list of users according to first name. Try again.',
        );
      default:
        return await requestResult(statusCode.OK, userList);
    }
    //-- end with db query  ---
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse = 'ERROR in get-like-first-name lambda function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(code, msgResponse);
  }
};
