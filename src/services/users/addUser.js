//Externals
const { Sequelize, Op } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Hepers
const { currentDateTime,c } = require('../../helpers/dates/date');
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
//Const/Vars
let user;
let dateNow;
let checkDbConn;



const addUser = async function (nickname, firstName, lastName, email, identificationType, identificationNumber, countryId) {
    try {
        user = null;
        dateNow = await c();

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