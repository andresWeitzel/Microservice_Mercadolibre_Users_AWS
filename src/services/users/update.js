//Externals
const { Op } = require('sequelize');
//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { statusName } = require('../../enums/connection/status-name');
//Helpers
const { currentDateTime } = require('../../helpers/dates/date');
//Const/Vars
let msg;
let user;
let dateNow;

/**
 * @description update a user from the database according to his id
 * @param {Integer} id Integer type
 * @param {String} nickname String type
 * @param {String} firstName String type
 * @param {String} lastName String type
 * @param {String} email String type
 * @param {String} identificationType String type
 * @param {String} identificatioNumber String type
 * @param {String} countryId String type
 * @param {String} creationDate String type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const updateUser = async function (
  id,
  nickname,
  firstName,
  lastName,
  email,
  identificationType,
  identificationNumber,
  countryId,
  creationDate,
) {
  try {
    user = null;

    dateNow = await currentDateTime();

    if (User != null) {
      await User.update(
        {
          nickname: nickname,
          first_name: firstName,
          last_name: lastName,
          email: email,
          identification_type: identificationType,
          identification_number: identificationNumber,
          country_id: countryId,
          creation_date: creationDate,
          update_date: dateNow,
        },
        {
          where: {
            id: id,
          },
        },
      )
        .then((userItem) => {
          user = userItem;
        })
        .catch((error) => {
          msg = `Error in updateUser User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          user = statusName.CONNECTION_ERROR;
        });
    } else {
      user = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in updateUser function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    user = statusName.CONNECTION_ERROR;
  }
  console.log(user);
  return user;
};

module.exports = {
  updateUser,
};
