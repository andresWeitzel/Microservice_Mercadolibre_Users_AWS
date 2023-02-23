//Const/vars
let validate;
let pathParameters;
let bodyParameters;

/**
 * @description validates the path parameters of the event
 * @param {Object} event Object type
 * @returns a boolean
 */
const validatePathParameters = async (event) => {
  validate = true;
  pathParameters = event.pathParameters;
  console.log(pathParameters.length)

  if (pathParameters == null || pathParameters == undefined || pathParameters.length < 0) {
    validate = false;
  }
  return validate;
}


/**
 * @description validates the body parameters of the event
 * @param {Object} event Object type
 * @returns a boolean
 */
const validateBodyParameters = async (event) => {
  validate = true;
  bodyParameters = event.body;

  if (bodyParameters == null || bodyParameters == undefined || (!bodyParameters.length)) {
    validate = false;
  }
  return validate;
}

module.exports = {
  validatePathParameters,
  validateBodyParameters
}