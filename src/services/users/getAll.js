//Externals
const { Sequelize } = require("sequelize");
//Models
const { User } = require("../../models/user");
//Helpers
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
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
            [
              Sequelize.fn(
                "DATE_FORMAT",
                Sequelize.col("creation_date"),
                "%Y-%m-%d %H:%i:%s"
              ),
              "creation_date",
            ],
            [
              Sequelize.fn(
                "DATE_FORMAT",
                Sequelize.col("update_date"),
                "%Y-%m-%d %H:%i:%s"
              ),
              "update_date",
            ],
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
          console.log(error);
        });
    } else {
      usersList = "ECONNREFUSED";
    }
  } catch (error) {
    console.log(error);
    usersList = "ECONNREFUSED";
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
          console.log(error);
        });
    } else {
      usersList = "ECONNREFUSED";
    }
  } catch (error) {
    console.log(error);
    usersList = "ECONNREFUSED";
  }

  console.log(usersList);
  return usersList;
};

module.exports = {
  getAll,
  getAllWithoutDate,
};
