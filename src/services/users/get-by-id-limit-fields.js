//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
//Helpers
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in getByIdLimit service function. Caused by ';
//Vars
let user;
let msg;

/**
 * @description Get a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
 * @param {Number} id Number type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
 */
const getByIdLimit = async function (id) {
  try {
    user = null;
    msg = null;

    if (User != null) {
      await User.findByPk(id, {
        attributes: {
          exclude: ['first_name', 'last_name', 'creation_date', 'update_date'],
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
  getByIdLimit,
};
