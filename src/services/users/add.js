//Models
const { User } = require("../../models/sequelize/user");
//Helpers
const { currentDateTime } = require("../../helpers/dates/date");
const {
  checkSequelizeErrors,
} = require("../../helpers/sequelize/errors/checkError");
const { sequelizeConnection } = require("../../enums/sequelize/errors");
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
//Vars
let newUser;
let msg;
let dateNow;

/**
 * @description add user to database
 * @param {String} nickname String type
 * @param {String} firstName String type
 * @param {String} lastName String type
 * @param {String} email String type
 * @param {String} identificationType String type
 * @param {String} identificatioNumber String type
 * @param {String} countryId String type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const addUser = async function (
  nickname,
  firstName,
  lastName,
  email,
  identificationType,
  identificationNumber,
  countryId
) {
  try {
    newUser = null;
    msg = null;
    dateNow = await currentDateTime();

    if (User != null) {
      await User.create({
        nickname: nickname,
        first_name: firstName,
        last_name: lastName,
        email: email,
        identification_type: identificationType,
        identification_number: identificationNumber,
        country_id: countryId,
        creation_date: dateNow,
        update_date: dateNow,
      })
        .then(async (userItem) => {
          newUser = userItem.dataValues;
        })
        .catch(async (error) => {
          msg = `Error in addUser function when trying to add a user. Caused by ${error}`;
          newUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      newUser = await checkSequelizeErrors(null, DB_CONNECTION_REFUSED_STATUS);
    }
  } catch (error) {
    msg = `Error in addUser function. Caused by ${error}`;
    console.log(msg);
    newUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return newUser;
};

module.exports = {
  addUser,
};
