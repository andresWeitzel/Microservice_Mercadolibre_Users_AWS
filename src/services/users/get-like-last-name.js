//Externals
const { Op } = require("sequelize");
//Models
const { User } = require("../../models/sequelize/user");
//Enums
const {
  sortingMessage,
} = require("../../enums/pagination/errors/status-message");
const { validateUser } = require("../../enums/validation/user/validations");
//Helpers
const { getDateFormat } = require("../../helpers/sequelize/format/date-format");
const { sequelizeConnection } = require("../../enums/sequelize/errors");
const {
  validatePathParameters,
} = require("../../helpers/http/query-string-params");
const {
  checkOrderAt,
  checkOrderBy,
} = require("../../helpers/pagination/users/order");
const {
  checkSequelizeErrors,
} = require("../../helpers/sequelize/errors/checkError");
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
//sorting messages
const ORDER_BY_ERROR_NAME = sortingMessage.ORDER_BY_ERROR_MESSAGE;
const ORDER_AT_ERROR_NAME = sortingMessage.ORDER_AT_ERROR_MESSAGE;
const GENERIC_ERROR_LOG_MESSAGE = "Error in getLikeLastName service function.";
//Validations
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
//Vars
let usersList;
let msgLog;
let validatePathParam;
let lastNameParam;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;

/**
 * @description get all paged users whose last name matches the passed as parameter
 * @param {Object} event event type
 * @returns a list of paginated users
 * @example
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12 21:18:11","update_date":"2023-02-12 21:18:11"},{"id".....]
 */
const getLikeLastName = async function (event) {
  try {
    usersList = null;
    //pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = "id";
    orderAt = "ASC";
    msgLog = null;

    //-- start with path parameters  ---
    lastNameParam = await event.pathParameters.lastName;

    validatePathParam = await validatePathParameters(lastNameParam);

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
            await getDateFormat("creation_date"),
            await getDateFormat("update_date"),
          ],
        },
        where: {
          last_name: {
            [Op.iLike]: `%${lastNameParam}%`, //containing what is entered, less strictmatch
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true, //Only dataValues
        nest: true, //for formatting with internal objects
      })
        .then(async (users) => {
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
        DB_CONNECTION_REFUSED_STATUS
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
  getLikeLastName,
};
