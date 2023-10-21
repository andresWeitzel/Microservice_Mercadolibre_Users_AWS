"use strict";
//Const/vars
let validate;
let msgResponse;
let msgLog;

/**
 * @description validates the path parameters of the event object
 * @param {Object} object Object type
 * @returns a boolean
 */
const validatePathParameters = async (object) => {
  try {
    validate =
      object == null ||
      object == undefined ||
      object.length < 0 ||
      object.length > 255 ||
      Object.keys(object).length === 0
        ? false
        : true;
  } catch (error) {
    validate = false;

    msgResponse = "ERROR in validatePathParameters() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
  return validate;
};

module.exports = {
  validatePathParameters,
};
