'use strict';
//Services
const { getByIdLimit } = require('../../services/users/get-by-id-limit-fields');
//Enums
const { statusCode } = require('../../enums/http/status-code');
const {
  validateHeadersMessage,
} = require('../../enums/validation/errors/status-message');
const {
  sequelizeConnection,
  sequelizeConnectionDetails,
} = require('../../enums/sequelize/errors');
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
const GET_BY_ID_USERS_BAD_REQUEST_DETAIL =
  'Bad request, failed to obtain a user based on id. Check if exist to database';
const GET_BY_ID_USERS_ERROR_DETAIL =
  'ERROR in get-by-id-limit-fields lambda function.';
//Vars
let user;
let validateAuth;
let validateReqParams;
let msgResponse;
let msgLog;

/**
 * @description Get a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
 * @param {Object} event Object type
 * @returns a user according to his id
 */
module.exports.handler = async (event) => {
  try {
    user = null;
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

    user = await getByIdLimit(event);

    switch (user) {
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
          GET_BY_ID_USERS_BAD_REQUEST_DETAIL,
        );
      default:
        if (typeof user === 'object' && user.hasOwnProperty('id')) {
          return await requestResult(OK_CODE, user);
        }
        return await requestResult(BAD_REQUEST_CODE, user);
    }
    //-- end with db query  ---
  } catch (error) {
    msgResponse = GET_BY_ID_USERS_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    return await requestResult(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
