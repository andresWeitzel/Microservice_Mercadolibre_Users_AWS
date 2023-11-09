//Models
const { User } = require('../../models/sequelize/user');
//Helpers
const { getDateFormat } = require('../../helpers/sequelize/format/date-format');
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
const { statusCode } = require('../../enums/http/status-code');
// Const
//connection_status
//codes
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
//sorting messages
const ORDER_BY_ERROR_MESSAGE = sortingMessage.ORDER_BY_ERROR_MESSAGE;
const ORDER_AT_ERROR_MESSAGE = sortingMessage.ORDER_AT_ERROR_MESSAGE;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in getAll service function. Caused by ';
//Vars
let usersList;
let msg;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;

/**
 * @description gets all paged users with all their attributes
 * @param {event} event event type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-22 21:18:11","update_date":"2023-02-22 21:18:11"},{"id".....]
 */
const getAll = async function (event) {
  try {
    usersList = null;
    msg = null;
    //pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgResponse = null;
    msgLog = null;

    //-- start with pagination  ---
    queryStrParams = event.queryStrParams;

    if (queryStrParams != (null && undefined)) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(await queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page
        ? parseInt(await queryStrParams.page)
        : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return await requestResult(BAD_REQUEST_CODE, ORDER_BY_ERROR_MESSAGE);
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return await requestResult(BAD_REQUEST_CODE, ORDER_AT_ERROR_MESSAGE);
    }

    order = [[orderBy, orderAt]];
    //-- end with pagination  ---

    if (User != null) {
      await User.findAll({
        attributes: {
          include: [
            await getDateFormat('creation_date'),
            await getDateFormat('update_date'),
          ],
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
      })
        .then(async (users) => {
          usersList = users.dataValues;
        })
        .catch(async (error) => {
          msg = GENERIC_ERROR_LOG_MESSAGE + error;
          console.log(msg);

          usersList = await checkSequelizeErrors(error, error.name);
        });
    } else {
      usersList = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msg = GENERIC_ERROR_LOG_MESSAGE + error;
    console.log(msg);

    usersList = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }

  return usersList;
};

module.exports = {
  getAll,
};
