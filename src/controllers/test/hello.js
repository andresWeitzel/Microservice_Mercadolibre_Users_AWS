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

module.exports.handler = async (event) => {

  //-- start with validation Headers  ---

  validate = await validateAuthHeaders(event);

  if (!validate) {
    return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
  }
  //-- end with validation Headers  ---


  return await requestResult(statusCode.OK, HELLO_TEST, event);
};
