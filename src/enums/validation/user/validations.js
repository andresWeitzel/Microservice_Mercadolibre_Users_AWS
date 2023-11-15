/**
 * @description Provides a name for each type of validation action (update, create, etc)
 * @returns the name according to type name
 * @example  VALIDATE_BODY_ADD_USER --> 'validateBodyAddUserParams'
 */
const validateUser = {
  VALIDATE_BODY_ADD_USER: 'validateBodyAddUserParams',
  VALIDATE_PATH_PARAMETER_USER: 'validateHeaderDeleteUserParams',
};

/**
 * @description Provides a description at body validation for each type of action (update, create, etc)
 * @returns the description according to type name
 * @example  VALIDATE_BODY_ADD_USER --> 'BAD REQUEST. Check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|...
 */
const validateUserDetails = {
  VALIDATE_BODY_ADD_USER_DETAIL:
    'Bad Request, check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)',
  VALIDATE_PATH_PARAMETER_USER_DETAIL:
    'Bad Request, the value of the path parameter is not valid. Check and try again.',
};

module.exports = {
  validateUser,
  validateUserDetails,
};
