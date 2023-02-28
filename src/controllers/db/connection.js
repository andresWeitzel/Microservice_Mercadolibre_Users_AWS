'use strict';
//dbConfig
const { dbConnection } = require('../../db/localConfig');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const/Vars
let msg;
let code;
let validate;
let xApiKey;
let authorization;

module.exports.handler = async (event) => {

  try {
    msg = null;
    code = null;
    //Headers
    xApiKey = await event.headers["x-api-key"];
    authorization = await event.headers["Authorization"];

    validate = await validateAuthHeaders(xApiKey, authorization);

    if (!validate) {
      return await requestResult(statusCode.UNAUTHORIZED, 'Not authenticated, check x_api_key and Authorization', event);
    }
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


  } catch (error) {
    console.log(error);
  }


};
