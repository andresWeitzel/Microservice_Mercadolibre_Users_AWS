//Models
const { User } = require('../../models/sequelize/user');
//Helpers
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../../helpers/pagination/users/order');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
const {
  sortingMessage,
} = require('../../enums/pagination/errors/status-message');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
//sorting messages
const ORDER_BY_ERROR_NAME = sortingMessage.ORDER_BY_ERROR_MESSAGE;
const ORDER_AT_ERROR_NAME = sortingMessage.ORDER_AT_ERROR_MESSAGE;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in getAllWithoutDate service function.';
//Vars
let usersList;
let msgLog;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;

/**
 * @description gets all paged users with all their attributes without date
 * @param {event} event event type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR",{"id".....]
 */
const getAllWithoutDate = async function (event) {
  try {
    usersList = null;
    //pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;

    //-- start with pagination  ---
    queryStrParams = await event.queryStringParameters;

    if (queryStrParams != (null && undefined)) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }
    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_ERROR_NAME;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_ERROR_NAME;
    }

    order = [[orderBy, orderAt]];
    //-- end with pagination  ---

    if (User != null) {
      await User.findAll({
        attributes: {
          exclude: ['creation_date', 'update_date'],
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true, //Only dataValues
        nest: true, //for formatting with internal objects
      })
        .then((users) => {
          usersList = users;
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
          console.log(msgLog);
          usersList = await checkSequelizeErrors(error, error.name);
        });
    } else {
      usersList = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
    console.log(msgLog);

    usersList = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }

  return usersList;
};

module.exports = {
  getAllWithoutDate,
};
