'use strict';
//External
const { Validator } = require('node-input-validator');
//Const/vars
let validateCheck;
let validatorObj;
let eventHeaders;
let eventHeadersObj;
let msgResponse;
let msgLog;

/**
 * @description We validate the request headers parameters
 * @param {Object} event event type
 * @returns a boolean
 * @example Content-Type, Authorization, etc
 */
const validateHeadersParams = async (event) => {
  try {
    eventHeadersObj = null;
    validatorObj = null;
    validateCheck = false;

    eventHeaders = await event.headers;

    if (eventHeaders == (null || undefined)) {
      return false;
    }

    eventHeadersObj = {
      headers: {
        contentType: await eventHeaders['Content-Type'],
        authorization: await eventHeaders['Authorization'],
        xApiKey: await eventHeaders['x-api-key'],
      },
    };
    validatorObj = new Validator(
      {
        eventHeadersObj,
      },
      {
        'eventHeadersObj.headers.contentType': 'required|string|maxLength:20',
        'eventHeadersObj.headers.authorization':
          'required|string|minLength:100|maxLength:400',
        'eventHeadersObj.headers.xApiKey':
          'required|string|minLength:30|maxLength:100',
      },
    );
    validateCheck = await validatorObj.check();
  } catch (error) {
    msgResponse = 'ERROR in validateHeadersParams() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }

  return validateCheck;
};

module.exports = {
  validateHeadersParams,
};
