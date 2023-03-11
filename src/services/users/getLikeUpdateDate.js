//Externals
const { Op, Sequelize } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Const/Vars
let usersList;


/**
 * @description get all paged users whose update date matches the passed as parameter
 * @param {String} updateDate String type
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated users
 * @example 
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12T15:03:04.000Z","update_date":"2023-02-12T15:03:04.000Z"},{"id".....]
 */
const getLikeUpdateDate = async function (updateDate, pageSizeNro, pageNro, orderBy) {
    try {
        usersList = null;
        await User.findAll(
            {
                attributes: {
                    include: [
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("creation_date"),
                            "%Y-%m-%d %H:%i:%s"), 'creation_date'],
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("update_date"),
                            "%Y-%m-%d %H:%i:%s"),
                            'update_date']
                    ],
                },
                where: {
                    [Op.and]: [
                        //This case is for DATEONLY format
                        Sequelize.where(
                            Sequelize.fn('DATE', Sequelize.col('update_date')),
                            {
                                [Op.eq]: updateDate,
                            }
                        ),
                    ]
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
    getLikeUpdateDate

};