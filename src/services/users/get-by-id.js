//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
//Helpers
const { getDateFormat } = require('../../helpers/sequelize/format/date-format');
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in getById service function. Caused by ';
//Vars
let user;
let msg;

/**
 * @description Get a user with all its attributes whose id matches the one passed as a parameter
 * @param {Number} idParam Number type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","first_name":"Javier","last_name":"Gonzalez","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR","creation_date":"2023-04-23 21:18:11","update_date":"2023-04-23 21:18:11"}
 */
const getById = async function (idParam) {
  try {
    user = null;
    msg = null;
    id = null;

    id = idParam ? parseInt(idParam) : id;

    if (User != null) {
      await User.findByPk(id, {
        attributes: {
          include: [
            await getDateFormat('creation_date'),
            await getDateFormat('update_date'),
          ],
        },
      })
        .then(async (object) => {
          user = object;
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
