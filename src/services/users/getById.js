//Models
const { User } = require("../../models/user");
//Enums
const { statusName } = require("../../enums/connection/statusName");
//Helpers
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
const { getDateFormat } = require("../../helpers/sequelize/format/dateFormat");
//Const/Vars
let user;
let checkDbConn;

/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Number} id Number type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","first_name":"Javier","last_name":"Gonzalez","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR","creation_date":"2023-04-23 21:18:11","update_date":"2023-04-23 21:18:11"}
 */
const getById = async function (id) {
  try {
    user = null;
    checkDbConn = await checkDbAuthentication();

    if (checkDbConn && User != null) {
      await User.findByPk(id, {
        attributes: {
          include: [
            await getDateFormat("creation_date"),
            await getDateFormat("update_date")
          ],
        },
      })
        .then((findUser) => {
          user = findUser;
        })
        .catch((error) => {
          msg = `Error in getById User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          user = statusName.CONNECTION_ERROR;
        });
    } else {
      user = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getById function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    user = statusName.CONNECTION_ERROR;
  }
  console.log(user);
  return user;
};

/**
 * @description gets a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
 * @param {Number} id Number type
 * @returns a user according to his id
 * @example
 * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
 */
const getByIdLimit = async function (id) {
  try {
    user = null;
    checkDbConn = await checkDbAuthentication();

    if (checkDbConn && User != null) {
      await User.findByPk(id, {
        attributes: {
          exclude: ["first_name", "last_name", "creation_date", "update_date"],
        },
      })
        .then((findUser) => {
          user = findUser;
        })
        .catch((error) => {
          msg = `Error in getByIdLimit User model. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          user = statusName.CONNECTION_ERROR;
        });
    } else {
      user = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getByIdLimit function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    user = statusName.CONNECTION_ERROR;
  }
  console.log(user);
  return user;
};

module.exports = {
  getById,
  getByIdLimit,
};
