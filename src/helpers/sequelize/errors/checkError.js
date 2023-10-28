//Enums
const {
  sequelizeConnection,
  sequelizeConstraint,
} = require("../../../enums/sequelize/errors");
//Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const DB_INVALID_CONNECTION_ERROR =
  sequelizeConnection.INVALID_CONNECTION_ERROR;
const DB_CONNECTION_TIMEOUT_ERROR =
  sequelizeConnection.CONNECTION_TIMEOUT_ERROR;
//vars
let check;
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
    check = null;

    if (error != (null || undefined)) {
      check =
        error.name.toLowerCase() == DB_CONNECTION_ERROR_STATUS.toLowerCase() ||
        DB_CONNECTION_REFUSED_STATUS.toLowerCase() ||
        DB_INVALID_CONNECTION_ERROR.toLowerCase() ||
        DB_CONNECTION_TIMEOUT_ERROR.toLowerCase()
          ? `${error.name}`
          : check;

      if (check != null) {
        return check;
      }

      check =
        error.name.toLowerCase() ==
          sequelizeConstraint.UNIQUE_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.FOREIGN_KEY_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.EXCLUSION_CONSTRAINT_ERROR.toLowerCase()
          ? `${error.name} : ${
              error.parent || error.parent?.detail || error.parent?.error
            }`
          : msg;
    } else {
      check = msg;
    }

    return check;
  } catch (error) {
    msgResponse = "ERROR in checkSequelizeErrors() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkSequelizeErrors,
};
