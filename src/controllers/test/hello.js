'use strict';
//Environment vars
const HELLO_TEST = process.env.HELLO_TEST;
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let validate;
let xApiKey;
let authorization;

module.exports.handler = async (event) => {

   //Headers
   xApiKey = await event.headers["x-api-key"];
   authorization = await event.headers["Authorization"];

   validate = await validateAuthHeaders(xApiKey, authorization);

   if (!validate) {
     return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
   }

  return await requestResult(statusCode.OK, HELLO_TEST, event);
};
