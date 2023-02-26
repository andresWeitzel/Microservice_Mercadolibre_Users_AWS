'use strict';
//Services
const { getAll, getAllWithoutDate
} = require('../../services/users/getAll');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let userList;
let xApiKey;
let authorization;
let validate;
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
    
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validate = await validateAuthHeaders(xApiKey, authorization);

    if (!validate) {
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
    //userList = await getAll(pageSizeNro, pageNro, orderBy);
    userList = await getAllWithoutDate(pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);
    //-- end with db query  ---

  } catch (error) {
    console.log(error);
  }

};
