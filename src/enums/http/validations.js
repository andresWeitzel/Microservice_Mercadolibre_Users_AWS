/**
 * @description Provides a name for each type of validation action (update, create, etc)
 * @returns the name according to type name
 * @example  VALIDATE_BODY_ADD_USER --> 'validateBodyAddUserParams'
 */
const validateUser = {
    VALIDATE_BODY_ADD_USER: "validateBodyAddUserParams",
    VALIDATE_HEADER_DELETE_USER: "validateHeaderDeleteUserParams",
};


  
  /**
   * @description Provides a description at body validation for each type of action (update, create, etc)
   * @returns the description according to type name
   * @example  VALIDATE_BODY_ADD_USER --> 'BAD REQUEST. Check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|...
   */
  const validateUserDetails = {
    VALIDATE_BODY_ADD_USER_DETAIL:
      "BAD REQUEST. Check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)",
      VALIDATE_HEADER_DELETE_USER_DETAIL: "BAD REQUEST. The id cannot be null or undefined."  
  };
  
  module.exports = {
    validateUser,
    validateUserDetails,
  };
  