'use strict';
//Services
const { getById, getByIdLimit } = require('../../services/users/getById');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
const {
  validatePathParameters
} = require('../../helpers/http/requestParameters');
//Const/Vars
let user;
let userId;
let xApiKey;
let authorization;
let validateHeaders;
let validatePathParam;

/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Object} event Object type
 * @returns a user according to his id
 */
module.exports.handler = async (event) => {
  try {
    user = null;
    userId = null;

    //Headers
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validateHeaders = await validateAuthHeaders(xApiKey, authorization);

    if (!validateHeaders) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }

    userId = await event.pathParameters.id;

    validatePathParam = await validatePathParameters(userId);

    if (validatePathParam) {

      user = await getByIdLimit(userId);

      return await requestResult(statusCode.OK, user, event);

    } else {

      return await requestResult(statusCode.BAD_REQUEST, 'Wrong request, check user id passed as parameter', event);
    }



  } catch (error) {
    console.log(error);
  }

};
