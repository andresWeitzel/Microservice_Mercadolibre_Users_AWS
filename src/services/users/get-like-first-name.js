//Externals
const { Op } = require('sequelize');
//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { statusName } = require('../../enums/connection/status-name');
//Helpers
const { getDateFormat } = require('../../helpers/sequelize/format/date-format');
//Const/Vars
let usersList;
let msg;

/**
 * @description get all paged users whose first name matches the passed as parameter
 * @param {String} firstName String type
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} order Array Object type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12 21:18:11","update_date":"2023-02-12 21:18:11"},{"id".....]
 */
const getLikeFirstName = async function (
  firstName,
  pageSizeNro,
  pageNro,
  order,
) {
  try {
    usersList = null;
    msg = null;

    if (User != null) {
      await User.findAll({
        attributes: {
          include: [
            await getDateFormat('creation_date'),
            await getDateFormat('update_date'),
          ],
        },
        where: {
          first_name: {
            [Op.like]: `%${firstName}%`, //containing what is entered, less strictmatch
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
      })
        .then((users) => {
          usersList = users.dataValues;
        })
        .catch((error) => {
          msg = `Error in getLikeFirstName User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          usersList = statusName.CONNECTION_ERROR;
        });
    } else {
      usersList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getLikeFirstName function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    usersList = statusName.CONNECTION_ERROR;
  }
  console.log(usersList);
  return usersList;
};

module.exports = {
  getLikeFirstName,
};
