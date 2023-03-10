'use strict';
//dbConfig
const { dbConnection } = require('../../db/localConfig');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateHeadersParams } = require('../../helpers/http/requestHeadersParams');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let msg;
let code;
let validate;
let validateReqParams;

module.exports.handler = async (event) => {

  try {
    msg = null;
    code = null;

    //-- start with validation Headers  ---

    validateReqParams = await validateHeadersParams(event);

    if (!validateReqParams) {
      return await requestResult(statusCode.BAD_REQUEST, 'Bad request, check missing or malformed headers', event);
    }

    validate = await validateAuthHeaders(event);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
    //-- end with validation Headers  ---

    //-- start with db query  ---
    await dbConnection.authenticate()
      .then(() => {
        msg = 'Connection has been established successfully.';
        code = statusCode.OK;

        console.log(msg);

      }).catch((error) => {
        msg = 'Unable to connect to the database: ', error;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.log(error);

      });

    return await requestResult(code, msg, event);
    //-- end with db query  ---

  } catch (error) {
    console.log(error);
  }


};
