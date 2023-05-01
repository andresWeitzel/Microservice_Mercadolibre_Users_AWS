//Models
const { User } = require('../../models/user');
//Enums
const {statusName} = require('../../enums/connection/statusName');
//Helpers
const { checkDbAuthentication } = require("../../helpers/db/authenticate");
//Const/Vars
let user;
let dateNow;
let checkDbConn;


/**
 * @description delete a user from the database according to his id
 * @param {Integer} id Integer type 
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const deleteUser = async function (id) {
    try {
        user = null;
        checkDbConn = await checkDbAuthentication();

        if (checkDbConn && User != null) {
        await User.destroy(
            {
                where:{
                    id: id
                }
            }
        )
            .then(userItem => {
                user = userItem;
            })
            .catch(error => {
                msg = `Error in delete User model. Caused by ${error}`;
                console.error(`${msg}. Stack error type : ${error.stack}`);
            })
        } else {
            user = statusName.CONNECTION_REFUSED;
          }
    } catch (error) {
        msg = `Error in deleteUser function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        user = statusName.ERROR;
    }
    console.log(user);
    return user;

}




module.exports = {
    deleteUser

};