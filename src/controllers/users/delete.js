'use strict';
//Services
const { deleteUser } = require('../../services/users/delete');
//Enums
const { statusCode } = require('../../enums/http/status-code');
const {
  sequelizeConnection,
  sequelizeConnectionDetails,
} = require('../../enums/sequelize/errors');
const {
  validateHeadersMessage,
} = require('../../enums/validation/errors/status-message');
const {
  validateUser,
  validateUserDetails,
} = require('../../enums/validation/user/validations');
//Helpers
const { requestResult } = require('../../helpers/http/body-response');
const {
  validateHeadersParams,
} = require('../../helpers/http/request-headers-params');
const { validateAuthHeaders } = require('../../helpers/auth/headers');
//Const
// validate msg
const HEADERS_PARAMS_ERROR_MESSAGE =
  validateHeadersMessage.HEADERS_PARAMS_ERROR_MESSAGE;
const HEADERS_AUTH_ERROR_MESSAGE =
  validateHeadersMessage.HEADERS_AUTH_ERROR_MESSAGE;
//codes
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const UNAUTHORIZED_CODE = statusCode.UNAUTHORIZED;
const OK_CODE = statusCode.OK;
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_ERROR_STATUS_DETAILS =
  sequelizeConnectionDetails.CONNECTION_ERROR_DETAIL;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const DB_CONNECTION_REFUSED_STATUS_DETAILS =
  sequelizeConnectionDetails.CONNECTION_REFUSED_DETAIL;
const DB_INVALID_CONNECTION_ERROR =
  sequelizeConnection.INVALID_CONNECTION_ERROR;
const DB_INVALID_CONNECTION_ERROR_DETAILS =
  sequelizeConnectionDetails.INVALID_CONNECTION_ERROR_DETAIL;
const DB_CONNECTION_TIMEOUT_ERROR =
  sequelizeConnection.CONNECTION_TIMEOUT_ERROR;
const DB_CONNECTION_TIMEOUT_ERROR_DETAILS =
  sequelizeConnectionDetails.CONNECTION_TIMEOUT_ERROR_DETAIL;
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
const VALIDATE_PATH_PARAMETER_USER_DETAIL =
  validateUserDetails.VALIDATE_PATH_PARAMETER_USER_DETAIL;
//Errors
const DELETE_USER_BAD_REQUEST_DETAIL =
  'Bad request, a non-existent user cannot be deleted. Operation not allowed';
const DELETE_USER_ERROR_DETAIL = 'ERROR in delete-user lambda function.';
//Vars
let validateAuth;
let validateReqParams;
let deletedUser;
let msgResponse;
let msgLog;

/**
 * @description delete a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event) => {
  try {
    //Init
    deletedUser = null;
    msgResponse = null;
    msgLog = null;

    //-- start with validation Headers  ---

    validateReqParams = await validateHeadersParams(event);

    if (!validateReqParams) {
      return await requestResult(
        BAD_REQUEST_CODE,
        HEADERS_PARAMS_ERROR_MESSAGE,
      );
    }

    validateAuth = await validateAuthHeaders(event);

    if (!validateAuth) {
      return await requestResult(UNAUTHORIZED_CODE, HEADERS_AUTH_ERROR_MESSAGE);
    }
    //-- end with validation Headers  ---

    //-- start with db query  ---

    deletedUser = await deleteUser(event);

    switch (deletedUser) {
      case DB_CONNECTION_ERROR_STATUS:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          DB_CONNECTION_ERROR_STATUS_DETAILS,
        );
      case DB_CONNECTION_REFUSED_STATUS:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          DB_CONNECTION_REFUSED_STATUS_DETAILS,
        );
      case DB_INVALID_CONNECTION_ERROR:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          DB_INVALID_CONNECTION_ERROR_DETAILS,
        );
      case DB_CONNECTION_TIMEOUT_ERROR:
        return await requestResult(
          INTERNAL_SERVER_ERROR_CODE,
          DB_CONNECTION_TIMEOUT_ERROR_DETAILS,
        );
      case VALIDATE_PATH_PARAMETER_USER:
        return await requestResult(
          BAD_REQUEST_CODE,
          VALIDATE_PATH_PARAMETER_USER_DETAIL,
        );
      case 0:
      case undefined:
      case null:
        return await requestResult(
          BAD_REQUEST_CODE,
          DELETE_USER_BAD_REQUEST_DETAIL,
        );
      default:
        if (
          typeof deletedUser === 'object' &&
          deletedUser.hasOwnProperty('objectDeleted')
        ) {
          return await requestResult(OK_CODE, deletedUser);
        }
        return await requestResult(BAD_REQUEST_CODE, deletedUser);
    }

    //-- end with db query  ---
  } catch (error) {
    msgResponse = DELETE_USER_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};