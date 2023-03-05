//Externals
const { Sequelize, Op } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Const/Vars
let usersList;


/**
 * @description get all paged users whose identification type matches the passed as parameter
 * @param {String} identificationType String type
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated users
 * @example 
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"22-02-2023 21:18:11","update_date":"22-02-2023 21:18:11"},{"id".....]
 */
const getLikeIdentificationType = async function (identificationType, pageSizeNro, pageNro, orderBy) {
    try {
        usersList = null;
        await User.findAll(
            {
                attributes: {
                    include: [
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("creation_date"),
                            "%d-%m-%Y %H:%i:%s"), 'creation_date'],
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("update_date"),
                            "%d-%m-%Y %H:%i:%s"), 'update_date']
                    ],
                },
                where: {
                    identification_type: {
                        [Op.like]: `%${identificationType}%`//containing what is entered, less strictmatch 
                    }
                },
                limit: pageSizeNro,
                offset: pageNro,
                order: orderBy,

            },

        )
            .then(users => {
                usersList = users;
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
    getLikeIdentificationType

};