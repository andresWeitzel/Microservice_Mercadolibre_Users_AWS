//Externals
const { Sequelize, Op } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Hepers
const { currentDateTime } = require('../../helpers/dates/date');
//Const/Vars
let userList;
let dateNow;



const addUser = async function (nickname, firstName, lastName, email, identificationType, identificationNumber, countryId) {
    try {
        userList = null;
        dateNow = await currentDateTime();

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
            .then(user => {
                userList = user;
                console.log(userList);
            })
            .catch(error => {
                console.log(error);
            })
        return userList;
    } catch (error) {
        console.log(error);
    }

}




module.exports = {
    addUser

};