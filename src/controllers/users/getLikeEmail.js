'use strict';
//Services
const { getLikeEmail } = require('../../services/users/getLikeEmail');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
const {
  validatePathParameters
} = require('../../helpers/http/requestParameters');
//Const/Vars
let userList;
let email;
let xApiKey;
let authorization;
let validate;
let validatePathParams;
let queryStrParams;
let pageSizeNro = 5;
let pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose email matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    email = null;

    //-- start with validation Headers  ---
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validate = await validateAuthHeaders(xApiKey, authorization);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
    //-- end with validation Headers  ---

    //-- start with path parameters  ---
    email = await event.pathParameters.email;

    validatePathParams = await validatePathParameters(email);
    //-- end with path parameters  ---

    if (validatePathParams) {

      //-- start with pagination  ---
      queryStrParams = event.queryStringParameters;

      if (!(queryStrParams == null)) {
        pageSizeNro = parseInt(await event.queryStringParameters.limit);
        pageNro = parseInt(await event.queryStringParameters.page);
      }
      //-- end with pagination  ---

      //-- start with db query  ---
      userList = await getLikeEmail(email, pageSizeNro, pageNro, orderBy);

      return await requestResult(statusCode.OK, userList, event);
      //-- end with db query  ---

    } else {
      return await requestResult(statusCode.BAD_REQUEST, 'Wrong request, verify email passed as parameter', event);
    }

  } catch (error) {
    console.log(error);
  }

};