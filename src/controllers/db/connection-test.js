'use strict';
//dbConfig
const { dbConnection } = require('../../db/local-config');
//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { requestResult } = require('../../helpers/http/body-response');
const { validateHeadersParams } = require('../../helpers/http/request-headers-params');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let validate;
let eventHeaders;
let validateReqParams;
let code;
let msgResponse;
let msgLog;

/**
 * @description test database connection
 * @param {Object} event Object type
 * @returns a message status whit the database connection
 */
module.exports.handler = async (event) => {

  try {
    code = null;
    msgResponse = null;
    msgLog = null;

    //-- start with validation Headers  ---

    eventHeaders = await event.headers;

    validateReqParams = await validateHeadersParams(eventHeaders);

    if (!validateReqParams) {
      return await requestResult(statusCode.BAD_REQUEST, 'Bad request, check missing or malformed headers');
    }

    validate = await validateAuthHeaders(eventHeaders);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization');
    }
    //-- end with validation Headers  ---

    //-- start with db query  ---
    await dbConnection.authenticate()
      .then(() => {
        msgResponse = 'Connection has been established successfully.';
        code = statusCode.OK;
        console.log(msgResponse);
      }).catch((error) => {
        msgResponse = `Unable to connect to the database. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.log(error);
      });

    return await requestResult(code, msgResponse);
    //-- end with db query  ---

  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse = 'ERROR in connection-test lambda function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(code, msgResponse);

  }


};
