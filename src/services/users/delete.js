//Models
const { User } = require("../../models/sequelize/user");
//Helpers
const {
  checkSequelizeErrors,
} = require("../../helpers/sequelize/errors/checkError");
//Enums
const { sequelizeConnection } = require("../../enums/sequelize/errors");
const { validateUser } = require("../../enums/http/validations");
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE =
  "Error in addUser service function. Caused by ";
//Validations
const VALIDATE_HEADER_DELETE_USER = validateUser.VALIDATE_HEADER_DELETE_USER;
//Const/Vars
let deletedUser;
let userIdParam;
let msg;

/**
 * @description delete a user from the database according to his userIdParam
 * @param {object} event objetc type
 * @returns a json object with the transaction performed
 * @example
 * {"userIdParam":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","idParamentification_type":"DNI","idParamentification_number":"2221233",.....}
 */
const deleteUser = async function (event) {
  try {
    deletedUser = null;
    msg = null;

    userIdParam = await event.pathParameters.id;

    if (userIdParam == (null || undefined)) {
      return VALIDATE_HEADER_DELETE_USER;
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
                  objectDeleted: `User has been successfully deleted based on id ${userIdParam}`,
                }
              : {
                  objectDeleted: `User based on id ${userIdParam} has not been deleted. Check if the user exists in the db.`,
                };
        })
        .catch(async (error) => {
          msg = GENERIC_ERROR_LOG_MESSAGE + error;
          console.log(msg);
          deletedUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      deletedUser = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS
      );
    }
  } catch (error) {
    msg = GENERIC_ERROR_LOG_MESSAGE + error;
    console.log(msg);
    deletedUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return deletedUser;
};

module.exports = {
  deleteUser,
};
