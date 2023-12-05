//Models
const { User } = require("../../models/sequelize/user");
//Helpers
const {
  checkSequelizeErrors,
} = require("../../helpers/sequelize/errors/checkError");
//Enums
const { sequelizeConnection } = require("../../enums/sequelize/errors");
const { validateUser } = require("../../enums/validation/user/validations");
// Const
//delete operation
const DELETE_OBJECT_DETAILS = "User has been successfully removed based on id ";
const DELETE_OBJECT_ERROR_DETAILS =
  "Check if the user you want to remove exists in the db. The user has not been removed based on the id ";
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE = "Error in addUser service function.";
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
//Vars
let deletedUser;
let userIdParam;
let msgLog;

/**
 * @description delete a user from the database according to his userIdParam
 * @param {object} event object type
 * @returns a json object with the transaction performed
 * @example
 * {"userIdParam":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","idParamentification_type":"DNI","idParamentification_number":"2221233",.....}
 */
const deleteUser = async function (event) {
  try {
    deletedUser = null;
    msgLog = null;

    userIdParam = await event.pathParameters.id;

    if (userIdParam == (null || undefined)) {
      return VALIDATE_PATH_PARAMETER_USER;
    }

    if (User != (null && undefined)) {
      await User.destroy({
        where: {
          id: userIdParam,
        },
      })
        .then(async (userItem) => {
          deletedUser =
            userItem == 1
              ? {
                  objectDeleted: DELETE_OBJECT_DETAILS + userIdParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + userIdParam,
                };
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
          console.log(msgLog);
          deletedUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      deletedUser = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS
      );
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
    console.log(msgLog);
    deletedUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return deletedUser;
};

module.exports = {
  deleteUser,
};
