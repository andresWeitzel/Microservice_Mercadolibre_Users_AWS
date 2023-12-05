//Models
const { User } = require("../../models/sequelize/user");
//Enums
const { sequelizeConnection } = require("../../enums/sequelize/errors");
const { validateUser } = require("../../enums/validation/user/validations");
//Helpers
const {
  checkSequelizeErrors,
} = require("../../helpers/sequelize/errors/checkError");
const {
  validatePathParameters,
} = require("../../helpers/http/query-string-params");
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE = "Error in getByIdLimit service function.";
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
//Vars
let user;
let msgLog;
let userIdParam;
let validatePathParam;

/**
 * @description Get a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
 * @param {object} event object type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
 */
const getByIdLimit = async function (event) {
  try {
    user = null;
    msgLog = null;
    userIdParam = null;

    //-- start with path parameters  ---
    userIdParam = event.pathParameters.id;

    validatePathParam = await validatePathParameters(userIdParam);

    if (!validatePathParam) {
      return VALIDATE_PATH_PARAMETER_USER;
    }
    //-- end with path parameters  ---

    if (User != null) {
      await User.findByPk(userIdParam, {
        attributes: {
          exclude: ["first_name", "last_name", "creation_date", "update_date"],
        },
        raw: true, //Only dataValues
        nest: true, //for formatting with internal objects
      })
        .then(async (object) => {
          user = object;
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
          console.log(msgLog);

          user = await checkSequelizeErrors(error, error.name);
        });
    } else {
      user = await checkSequelizeErrors(null, DB_CONNECTION_REFUSED_STATUS);
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
    console.log(msgLog);

    user = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return user;
};

module.exports = {
  getByIdLimit,
};
