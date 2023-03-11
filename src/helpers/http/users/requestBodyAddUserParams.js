//External Imports
const { Validator } = require("node-input-validator");
//Const/vars
let validateCheck;
let body;

/**
 * @description We validate the request body parameters for add an user
 * @param {object} body event.body type
 * @returns a boolean
 */
const validateBodyAddUserParams = async (body) => {
  validateCheck = false;
  console.log(body);
  
  try{
    if(body!=null){
      validateCheck = new Validator(
        {
          body,
        },
        {
          "body.nickname": "required|string|minLength:6|maxLength:50",
          "body.first_name": "required|string|minLength:4|maxLength:50",
          "body.last_name": "required|string|minLength:4|maxLength:50",
          "body.email": "required|string|minLength:10|maxLength:100",
          "body.identification_type": "required|minLength:3|maxLength:20",
          "body.identification_number": "required|minLength:6|maxLength:20",
          "body.country_id": "required|string|minLength:2|maxLength:4",
        }
      );
      await validateCheck.check();
    }

  } catch (error) {
    console.log(error);
  }

  return validateCheck;
}

module.exports = {
    validateBodyAddUserParams
}