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
  validateBodyUpdateUserParams,
} = require('../../helpers/http/users/request-body-update-user-params');
// Const
//connection_status
const DB_CONNECTION_ERROR_STATUS = sequelizeConnection.CONNECTION_ERROR;
const DB_CONNECTION_REFUSED_STATUS =
  sequelizeConnection.CONNECTION_REFUSED_ERROR;
const GENERIC_ERROR_LOG_MESSAGE = 'Error in updateUser service function.';
//validations
const VALIDATE_BODY_UPDATE_USER = validateUser.VALIDATE_BODY_UPDATE_USER;
const VALIDATE_PATH_PARAMETER_USER = validateUser.VALIDATE_PATH_PARAMETER_USER;
const UPDATE_OBJECT_DETAILS = 'User has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the user you want to updated exists in the db. The user has not been updated based on the id ';
//Vars
let updatedUser;
let eventBody;
let validateReqBodyParams;
let userIdParam;
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
 * @description update a user from the database according to his id
 * @param {object} event object type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const updateUser = async function (event) {
  try {
    updatedUser = null;
    nicknameParam = null;
    firstNameParam = null;
    lastNameParam = null;
    emailParam = null;
    identTypeParam = null;
    identNumberParam = null;
    countryIdParam = null;
    creationDateParam = null;
    updateDateParam = null;
    //Log
    msgLog = null;

    //-- start with validation path parameters  ---

    userIdParam = await event.pathParameters.id;

    if (userIdParam == (null || undefined)) {
      return VALIDATE_PATH_PARAMETER_USER;
    }
    //-- end with validation path parameters  ---

    //-- start with validation Body  ---

    eventBody = JSON.parse(await event.body);

    validateReqBodyParams = await validateBodyUpdateUserParams(eventBody);

    if (!validateReqBodyParams || eventBody == (null || undefined)) {
      return VALIDATE_BODY_UPDATE_USER;
    }
    //-- end with validation Body  ---

    nicknameParam = eventBody.nickname ? eventBody.nickname : nicknameParam;
    firstNameParam = eventBody.first_name
      ? eventBody.first_name
      : firstNameParam;
    lastNameParam = eventBody.last_name ? eventBody.last_name : lastNameParam;
    emailParam = eventBody.email ? eventBody.email : emailParam;
    identTypeParam = eventBody.identification_type
      ? eventBody.identification_type
      : identTypeParam;
    identNumberParam = eventBody.identification_number
      ? eventBody.identNumberParam
      : identNumberParam;
    countryIdParam = eventBody.country_id
      ? eventBody.country_id
      : countryIdParam;
    creationDateParam = await currentDateTime();
    updateDateParam = await currentDateTime();

    if (User != (null && undefined)) {
      await User.update(
        {
          nickname: nicknameParam,
          first_name: firstNameParam,
          last_name: lastNameParam,
          email: emailParam,
          identification_type: identTypeParam,
          identification_number: identNumberParam,
          country_id: countryIdParam,
          creation_date: creationDateParam,
          update_date: updateDateParam,
        },
        {
          where: {
            id: userIdParam,
          },
        },
      )
        .then(async (userItem) => {
          updatedUser =
            userItem[0] == 1
              ? {
                  objectUpdated: UPDATE_OBJECT_DETAILS + userIdParam,
                }
              : {
                  objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + userIdParam,
                };
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
          console.log(msgLog);
          updatedUser = await checkSequelizeErrors(error, error.name);
        });
    } else {
      updatedUser = await checkSequelizeErrors(
        null,
        DB_CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + `Caused by ${error}`;
    console.log(msgLog);
    updatedUser = await checkSequelizeErrors(error, DB_CONNECTION_ERROR_STATUS);
  }
  console.log(updatedUser);
  return updatedUser;
};

module.exports = {
  updateUser,
};
