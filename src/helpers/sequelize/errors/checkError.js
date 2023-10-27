//Enums
const {
  sequelizeConnection,
  sequelizeConstraint,
} = require("../../../enums/sequelize/errors");
//Const-vars
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
        error.name.toLowerCase() ==
          sequelizeConstraint.UNIQUE_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.FOREIGN_KEY_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.EXCLUSION_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_REFUSED_ERROR.toLowerCase() ||
        sequelizeConnection.INVALID_CONNECTION_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_TIMEOUT_ERROR.toLowerCase()
          // ? `${error.name} : ${error.parent || error.parent?.detail || error.parent?.error}`
          // : msg;
          ? `${error.name}`
          : msg;
    } else {
      check = msg;
    }
  } catch (error) {
    msgResponse = "ERROR in checkSequelizeErrors() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }

  return check;
};

module.exports = {
  checkSequelizeErrors,
};
