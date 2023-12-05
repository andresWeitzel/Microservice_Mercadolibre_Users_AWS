//Models
const { User } = require('../../models/sequelize/user');
//Enums
const { sequelizeConnection } = require('../../enums/sequelize/errors');
const { validateUser } = require('../../enums/validation/user/validations');
//Helpers
const { currentDateTime } = require('../../helpers/dates/date');
const {
  checkSequelizeErrors,
} = require('../../helpers/sequelize/errors/checkError');
const {
  validateBodyAddUserParams,
} = require('../../helpers/http/users/request-body-add-user-params');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in addUser service function.';
//Validations
const VALIDATE_BODY_ADD_USER = validateUser.VALIDATE_BODY_ADD_USER;
//Vars
let newUser;
let eventBody;
let validateReqBodyParams;
let msgLog;
let nicknameParam;
let firstNameParam;
let lastNameParam;
let emailParam;
let identTypeParam;
let identNumberParam;
let countryIdParam;
let creationDateParam;
let updateDateParam;

/**
 * @description add user to database
 * @param {object} event object type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const addUser = async function (event) {
  try {
    newUser = null;
    msgLog = null;

    //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    validateReqBodyParams = await validateBodyAddUserParams(eventBody);

    if (!validateReqBodyParams || eventBody == (null || undefined)) {
      return VALIDATE_BODY_ADD_USER;
    }
    //-- end with validation Body  ---

    nicknameParam = eventBody.nickname;
    firstNameParam = eventBody.first_name;
    lastNameParam = eventBody.last_name;
    emailParam = eventBody.email;
    identTypeParam = eventBody.identification_type;
    identNumberParam = eventBody.identification_number;
    countryIdParam = eventBody.country_id;
    creationDateParam = await currentDateTime();
    updateDateParam = await currentDateTime();

    if (User != (null && undefined)) {
      await User.create({
        nickname: nicknameParam,
        first_name: firstNameParam,
        last_name: lastNameParam,
        email: emailParam,
        identification_type: identTypeParam,
        identification_number: identNumberParam,
        country_id: countryIdParam,
        creation_date: creationDateParam,
        update_date: updateDateParam,
      })
        .then(async (userItem) => {
          newUser = userItem != null ? userItem.dataValues : userItem;
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
          console.log(msgLog);
          newUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      newUser = await checkSequelizeErrors(null, DB_CONNECTION_REFUSED_STATUS);
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
    console.log(msgLog);
    newUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  return newUser;
};

module.exports = {
  addUser,
};
