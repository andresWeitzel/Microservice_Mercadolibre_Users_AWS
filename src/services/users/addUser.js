//Models
const { User } = require('../../models/user');
//Enums
const {statusName} = require('../../enums/connection/statusName');
//Helpers
const { currentDateTime } = require('../../helpers/dates/date');
//Const/Vars
let user;
let msg;
let dateNow;


/**
 * @description add user to database
 * @param {String} nickname String type
 * @param {String} firstName String type
 * @param {String} lastName String type
 * @param {String} email String type
 * @param {String} identificationType String type
 * @param {String} identificatioNumber String type  
 * @param {String} countryId String type  
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const addUser = async function (nickname, firstName, lastName, email, identificationType, identificationNumber, countryId) {
    try {
        user = null;
        msg = null;
        dateNow = await currentDateTime();

        if (User != null) {
        await User.create(
            {
                nickname: nickname,
                first_name: firstName,
                last_name: lastName,
                email: email,
                identification_type: identificationType,
                identification_number: identificationNumber,
                country_id: countryId,
                creation_date: dateNow,
                update_date: dateNow,
            },
        )
            .then(userItem => {
                user = userItem;
            })
            .catch(error => {
                msg = `Error in create User model. Caused by ${error}`;
                console.error(`${msg}. Stack error type : ${error.stack}`);
                user = statusName.CONNECTION_ERROR;
            })
        } else {
            user = statusName.CONNECTION_REFUSED;
          }
    } catch (error) {
        msg = `Error in addUser function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        user = statusName.CONNECTION_ERROR;
    }
    console.log(user);
    return user;

};



module.exports = {
    addUser
};