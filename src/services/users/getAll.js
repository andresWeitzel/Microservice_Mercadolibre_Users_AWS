//Externals
const { Sequelize } = require("sequelize");
//Models
const { User } = require("../../models/user");
//Helpers
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
const { getDateFormat } = require("../../helpers/sequelize/format/dateFormat");
//Enums
const { statusName } = require("../../enums/connection/statusName");
//Const/Vars
let usersList;
let checkDbConn;

/**
 * @description gets all paged users with all their attributes
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-22 21:18:11","update_date":"2023-02-22 21:18:11"},{"id".....]
 */
const getAll = async function (pageSizeNro, pageNro, orderBy) {
  try {
    usersList = null;
    checkDbConn = await checkDbAuthentication();

    if (checkDbConn && User != null) {
      await User.findAll({
        attributes: {
          include: [
            await getDateFormat("creation_date"),
            await getDateFormat("update_date")
          ],
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
      })
        .then((users) => {
          usersList = users;
        })
        .catch((error) => {
          msg = `Error in getAll User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          usersList = statusName.CONNECTION_ERROR;

        });
    } else {
      usersList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getAll function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    usersList = statusName.CONNECTION_ERROR;
  }

  console.log(usersList);
  return usersList;
};

/**
 * @description gets all paged users with all their attributes without date
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR",{"id".....]
 */
const getAllWithoutDate = async function (pageSizeNro, pageNro, orderBy) {
  try {
    usersList = null;
    checkDbConn = await checkDbAuthentication();

    if (checkDbConn && User != null) {
      await User.findAll({
        attributes: {
          exclude: ["creation_date", "update_date"],
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
      })
        .then((users) => {
          usersList = users;
        })
        .catch((error) => {
          msg = `Error in getAllWithoutDate User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          usersList = statusName.CONNECTION_ERROR;
        });
    } else {
      
      usersList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getAllWithoutDate function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    usersList = statusName.CONNECTION_ERROR;
  }

  console.log(usersList);
  return usersList;
};

module.exports = {
  getAll,
  getAllWithoutDate,
};
