//Enums
const {
  sequelizeConnection,
  sequelizeConstraint,
} = require('../../../enums/sequelize/errors');
//Const
//connection_sequelize
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const DB_INVALID_CONNECTION_ERROR =
  sequelizeConnection.INVALID_CONNECTION_ERROR;
const DB_CONNECTION_TIMEOUT_ERROR =
  sequelizeConnection.CONNECTION_TIMEOUT_ERROR;
//constraint_sequelize
const DB_UNIQUE_CONSTRAINT_ERROR = sequelizeConstraint.UNIQUE_CONSTRAINT_ERROR;
const DB_FOREIGN_KEY_CONSTRAINT_ERROR =
  sequelizeConstraint.FOREIGN_KEY_CONSTRAINT_ERROR;
const DB_EXCLUSION_CONSTRAINT_ERROR =
  sequelizeConstraint.EXCLUSION_CONSTRAINT_ERROR;
//vars
let checkConnection;
let checkConstraint;
let msgResponse;
let msgLog;

/**
 * @description check all sequelize errors according to the defined enumerates
 * @param {object} error error type
 * @param {string} msg string type
 * @returns the type of error with msg
 */
const checkSequelizeErrors = async (error, msg) => {
  try {
    checkConnection = null;
    checkConstraint = null;

    if (error == (null || undefined)) {
      return msg;
    }

    checkConnection =
      error.name.toLowerCase() ==
      (DB_CONNECTION_ERROR_STATUS.toLowerCase() ||
        DB_CONNECTION_REFUSED_STATUS.toLowerCase() ||
        DB_INVALID_CONNECTION_ERROR.toLowerCase() ||
        DB_CONNECTION_TIMEOUT_ERROR.toLowerCase())
        ? `${error.name}`
        : checkConnection;

    if (checkConnection != (null && undefined)) {
      return checkConnection;
    }

    checkConstraint =
      error.name.toLowerCase() ==
      (DB_UNIQUE_CONSTRAINT_ERROR.toLowerCase() ||
        DB_FOREIGN_KEY_CONSTRAINT_ERROR.toLowerCase() ||
        DB_EXCLUSION_CONSTRAINT_ERROR.toLowerCase())
        ? `${error.name} : ${
            error.parent || error.parent?.detail || error.parent?.error
          }`
        : msg;

    if (checkConstraint != (null && undefined)) {
      return checkConstraint;
    }
  } catch (error) {
    msgResponse = 'ERROR in checkSequelizeErrors() helper function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkSequelizeErrors,
};
