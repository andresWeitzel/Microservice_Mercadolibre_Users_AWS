'use strict';
//Environment vars
const X_API_KEY = process.env.X_API_KEY;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
//Const/vars
let xApiKey;
let authorization;
let validate;
let eventHeaders;
let msgResponse;
let msgLog;

/**
 * @description check the x-api-key and the bearer token. In case they are not correct, we return false
 * @param {Object} event event type
 * @returns a boolean
 */
const validateAuthHeaders = async (event) => {
  try {
    eventHeaders = await event.headers;
    console.log(eventHeaders);

    if(eventHeaders == (null || undefined)){
      return false;
    }

    xApiKey = await eventHeaders['x-api-key'];
    authorization = await eventHeaders['Authorization'];

    validate =
      xApiKey != X_API_KEY ||
      authorization != BEARER_TOKEN ||
      authorization == null
        ? false
        : true;

    return validate;
  } catch (error) {
    msgResponse = 'ERROR in validateAuthHeaders() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = { validateAuthHeaders };
