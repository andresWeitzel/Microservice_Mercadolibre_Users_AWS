'use strict';
//Services
const { getLikeIdentificationType } = require('../../services/users/getLikeIdentificationType');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let userList;
let identificationType;
let xApiKey;
let authorization;
let validate;
const pageSizeNro = 5;
const pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose IdentificationType matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    identificationType = null;

    //Headers
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validate = await validateAuthHeaders(xApiKey, authorization);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }

    identificationType = await event.pathParameters.identificationType;


    userList = await getLikeIdentificationType(identificationType, pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);

  } catch (error) {
    console.log(error);
  }

};
