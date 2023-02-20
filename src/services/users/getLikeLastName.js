//Externals
const { Op } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Const/Vars
let usersList;


/**
 * @description get all paged users whose last name matches the passed as parameter
 * @param {String} lastname String type
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated users
 * @example 
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12T15:03:04.000Z","update_date":"2023-02-12T15:03:04.000Z"},{"id".....]
 */
const getLikeLastName = async function (lastName, pageSizeNro, pageNro, orderBy) {
    try {
        usersList = null;
        await User.findAll(
            {
                limit: pageSizeNro,
                offset: pageNro,
                order: orderBy,
                where: {
                    last_name: {
                        [Op.like]: `%${lastName}%`//containing what is entered, less strictmatch 
                    }
                }
            },

        )
            .then(users => {
                usersList = JSON.stringify(users);
                console.log(usersList);
            })
            .catch(error => {
                console.log(error);
            })
        return usersList;
    } catch (error) {
        console.log(error);
    }

}




module.exports = {
    getLikeLastName

};