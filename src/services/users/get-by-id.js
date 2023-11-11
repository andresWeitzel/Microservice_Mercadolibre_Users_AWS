//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
const { validateUser } = require('../../enums/validation/user/validations');
//Helpers
const { getDateFormat } = require('../../helpers/sequelize/format/date-format');
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in getById service function. Caused by ';
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
//Vars
let user;
let msg;
let userIdParam;
let validatePathParam;

/**
 * @description Get a user with all its attributes whose id matches the one passed as a parameter
 * @param {object} event object type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","first_name":"Javier","last_name":"Gonzalez","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR","creation_date":"2023-04-23 21:18:11","update_date":"2023-04-23 21:18:11"}
 */
const getById = async function (event) {
  try {
    user = null;
    msg = null;
    userIdParam = null;

    //-- start with path parameters  ---
    userIdParam = await event.pathParameters.id;

    validatePathParam = await validatePathParameters(userIdParam);

    if (!validatePathParam) {
      return VALIDATE_PATH_PARAMETER_USER;
    }
    //-- end with path parameters  ---

    if (User != null) {
      await User.findByPk(userIdParam, {
        attributes: {
          include: [
            await getDateFormat('creation_date'),
            await getDateFormat('update_date'),
          ],
        },
      })
        .then(async (object) => {
          user = object != null ? object.dataValues : object;
        })
        .catch(async (error) => {
          msg = GENERIC_ERROR_LOG_MESSAGE + error;
          console.log(msg);

          user = await checkSequelizeErrors(error, error.name);
        });
    } else {
      user = await checkSequelizeErrors(null, DB_CONNECTION_REFUSED_STATUS);
    }
  } catch (error) {
    msg = GENERIC_ERROR_LOG_MESSAGE + error;
    console.log(msg);

    user = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return user;
};

module.exports = {
  getById,
};
