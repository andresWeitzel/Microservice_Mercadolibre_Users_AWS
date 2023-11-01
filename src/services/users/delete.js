//Models
const { User } = require('../../models/sequelize/user');
//Helpers
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
//Const/Vars
let deletedUser;
let msg;
let idParam;

/**
 * @description delete a user from the database according to his idParam
 * @param {Integer} idParam Integer type
 * @returns a json object with the transaction performed
 * @example
 * {"idParam":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","idParamentification_type":"DNI","idParamentification_number":"2221233",.....}
 */
const deleteUser = async function (idParam) {
  try {
    deletedUser = null;
    msg = null;

    if (User != (null && undefined) && idParam != null) {
      await User.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (userItem) => {
          deletedUser =
            userItem == 1
              ? {
                  objectDeleted: `User has been successfully deleted based on id ${idParam}`,
                }
              : {
                  objectDeleted: `User based on id ${idParam} has not been deleted. Check if the user exists in the db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in delete User model. Caused by ${error}`;
          deletedUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      deletedUser = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msg = `Error in deleteUser function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    deletedUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  console.log(deletedUser);
  return deletedUser;
};

module.exports = {
  deleteUser,
};
