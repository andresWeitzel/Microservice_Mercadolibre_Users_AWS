//External Imports
const { Validator } = require("node-input-validator");
//Const/vars
let validateCheck;

/**
 * @description We validate the request headers parameters
 * @param {Object} object Object type
 * @returns a boolean
 * @example Content-Type, Authorization, etc
 */
const validateHeadersParams = async (object) => {
  validateCheck = false;
  try{
    validateCheck = new Validator(
      {
        object,
      },
      {
        "object.headers": "required|object",
        "object.headers.Content-Type": "required|string",
        "object.headers.Authorization": "required|string|minLength:100",
        "object.headers.x-api-key": "required|string|minLength:30",
      }
    );
  } catch (error) {
    console.log(error);
  }

  return await validateCheck.check();
}

module.exports = {
  validateHeadersParams
}