//Externals
const { Op, Sequelize } = require('sequelize');
//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
const {
  sortingMessage,
} = require('../../enums/pagination/errors/status-message');
const { validateUser } = require('../../enums/validation/user/validations');
//Helpers
const { getDateFormat } = require('../../helpers/sequelize/format/date-format');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../../helpers/pagination/users/order');
const {
  getLowerFormat,
} = require('../../helpers/sequelize/format/lower-format');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
//sorting messages
const ORDER_BY_ERROR_NAME = sortingMessage.ORDER_BY_ERROR_MESSAGE;
const ORDER_AT_ERROR_NAME = sortingMessage.ORDER_AT_ERROR_MESSAGE;
const GENERIC_ERROR_LOG_MESSAGE = 'Error in getLikeEmail service function.';
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
//Vars
let usersList;
let msgLog;
let validatePathParam;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;

/**
 * @description get all paged users whose emailParam matches the passed as parameter.
 * @param {Object} event event type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","emailParam":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12 21:18:11","update_date":"2023-02-12 21:18:11"},{"id".....]
 */
const getLikeEmail = async function (event) {
  try {
    usersList = null;
    //pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;

    //-- start with path parameters  ---
    emailParam = await event.pathParameters.email;

    validatePathParam = await validatePathParameters(emailParam);

    if (!validatePathParam) {
      return VALIDATE_PATH_PARAMETER_USER;
    }
    //-- end with path parameters  ---

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
          include: [
            await getDateFormat('creation_date'),
            await getDateFormat('update_date'),
          ],
        },
        where: await getLowerFormat('email', emailParam),
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true, //Only dataValues
        nest: true, //for formatting with internal objects
      })
        .then(async (users) => {
          console.log(users);
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
  getLikeEmail,
};
