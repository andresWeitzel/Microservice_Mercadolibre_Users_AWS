'use strict';
//Services
const { getAll, getAllWithoutDate
} = require('../../services/users/getAll');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateHeadersParams } = require('../../helpers/http/requestHeadersParams');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let userList;
let validateReqParams;
let validateAuth;
let queryStrParams;
let pageSizeNro = 5;
let pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description gets all paged users
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    //Init 
    userList = null;

    //-- start with validation Headers  ---

    validateReqParams = await validateHeadersParams(event);

    if (!validateReqParams) {
      return await requestResult(statusCode.BAD_REQUEST, 'Bad request, check missing or malformed headers', event);
    }

    validateAuth = await validateAuthHeaders(event);

    if (!validateAuth) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
    //-- end with validation Headers  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (!(queryStrParams == null)) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      pageNro = parseInt(await event.queryStringParameters.page);
    }
    //-- end with pagination  ---

    //-- start with db query  ---
    userList = await getAll(pageSizeNro, pageNro, orderBy);

    console.log(userList);

    if(userList == 'ECONNREFUSED'){
      return await requestResult(statusCode.INTERNAL_SERVER_ERROR, 'ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available', event);  
    }
    // userList = await getAllWithoutDate(pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);
    //-- end with db query  ---

  } catch (error) {
    console.log(error);
  }

};
