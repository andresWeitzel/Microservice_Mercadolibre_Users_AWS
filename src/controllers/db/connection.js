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
let validate;
let xApiKey;
let authorization;

module.exports.handler = async (event) => {

  try {
    msg = null;
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
        console.log(msg);
      }).catch((error) => {
        msg = 'Unable to connect to the database: ', error;
        console.log(msg);
      });


    return await requestResult(statusCode.OK, msg, event);

  } catch (error) {
    console.log(error);
  }


};
