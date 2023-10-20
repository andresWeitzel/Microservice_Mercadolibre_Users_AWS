//External Imports
const { Validator } = require('node-input-validator');
//Const/vars
let validateCheck;
let validatorObj;
let eventBodyObj;
/**
 * @description We validate the request body parameters for add an user
 * @param {object} eventBody event.body type
 * @returns a boolean
 */
const validateBodyAddUserParams = async (eventBody) => {
  try {
    eventBodyObj = null;
    validatorObj = null;
    validateCheck = false;

    if (eventBody != null) {
      eventBodyObj = {
        data: {
          nickname: await eventBody.nickname,
          firstName: await eventBody.first_name,
          lastName: await eventBody.last_name,
          email: await eventBody.email,
          identificationType: await eventBody.identification_type,
          identificationNumber: await eventBody.identification_number,
          countryId: await eventBody.country_id,
        },
      };

      validatorObj = new Validator(
        {
          eventBodyObj,
        },
        {
          'eventBodyObj.data.nickname':
            'required|string|minLength:4|maxLength:50',
          'eventBodyObj.data.firstName':
            'required|string|minLength:4|maxLength:50',
          'eventBodyObj.data.lastName':
            'required|string|minLength:4|maxLength:50',
          'eventBodyObj.data.email':
            'required|string|minLength:10|maxLength:100',
          'eventBodyObj.data.identificationType':
            'required|string|minLength:2|maxLength:20',
          'eventBodyObj.data.identificationNumber':
            'required|string|minLength:6|maxLength:20',
          'eventBodyObj.data.countryId':
            'required|string|minLength:2|maxLength:5',
        },
      );
      validateCheck = await validatorObj.check();
    }
  } catch (error) {
    console.error(
      `Error in validateBodyAddUserParams() function. Caused by ${error}. Specific stack is ${error.stack}`,
    );
  }

  return validateCheck;
};

module.exports = {
  validateBodyAddUserParams,
};
