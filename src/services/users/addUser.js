//Externals
const { Sequelize, Op } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Hepers
const { currentDateTime } = require('../../helpers/dates/date');
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
//Const/Vars
let user;
let dateNow;
let checkDbConn;


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
        dateNow = await currentDateTime();

        checkDbConn = await checkDbAuthentication();

        if (checkDbConn && User != null) {
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
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            user = "ECONNREFUSED";
          }
    } catch (error) {
        console.log(error);
        user = "ERROR";
    }
    console.log(user);
    return user;

}




module.exports = {
    addUser

};