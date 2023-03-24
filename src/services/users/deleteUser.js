//Models
const { User } = require('../../models/user');
//Hepers
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
    deleteUser

};