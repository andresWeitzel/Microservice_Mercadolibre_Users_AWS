"use strict";
//Const/vars
let validate;

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
    console.error(
      `Error in validatePathParameters() function. Caused by ${error}. Specific stack is ${error.stack}`
    );
  }
  return validate;
};

module.exports = {
  validatePathParameters,
};
