'use strict';
//Services
const { getLikeCreationDate } = require('../../services/users/getLikeCreationDate');
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
let creationDate;
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
 * @description get all paged users whose creationDate matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    creationDate = null;

    //-- start with validation Headers  ---
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validate = await validateAuthHeaders(xApiKey, authorization);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
    //-- end with validation Headers  ---

    //-- start with path parameters  ---
    creationDate = await event.pathParameters.creationDate;

    validatePathParams = await validatePathParameters(creationDate);
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
      userList = await getLikeCreationDate(creationDate, pageSizeNro, pageNro, orderBy);

      return await requestResult(statusCode.OK, userList, event);
      //-- end with db query  ---

    } else {
      return await requestResult(statusCode.BAD_REQUEST, 'Wrong request, verify creation date passed as parameter', event);
    }

  } catch (error) {
    console.log(error);
  }

};