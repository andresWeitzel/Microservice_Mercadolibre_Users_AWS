//Externals
const { Sequelize } = require("sequelize");
//Models
const { User } = require('../../models/user');
//Const/Vars
let user;


/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Number} id Number type
 * @returns a user according to his id
 * @example 
 * {"id":2,"nickname":"JAVIER GONZALEZ","first_name":"Javier","last_name":"Gonzalez","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR","creation_date":"22-02-2023 21:18:11","update_date":"22-02-2023 21:18:11"}
 */
const getById = async function (id) {
    try {
        user = null;
        await User.findByPk(
            id,
            {
                attributes: {
                    include: [
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("creation_date"),
                            "%d-%m-%Y %H:%i:%s"), 'creation_date'],
                        [Sequelize.fn("DATE_FORMAT", Sequelize.col("update_date"),
                            "%d-%m-%Y %H:%i:%s"), 'update_date']
                    ],
                },
            }
        )
            .then(findUser => {
                user = findUser;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
        return user;
    } catch (error) {
        console.log(error);
    }

}

/**
 * @description gets a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
 * @param {Number} id Number type
 * @returns a user according to his id
 * @example 
 * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
 */
const getByIdLimit = async function (id) {
    try {
        user = null;
        await User.findByPk(
            id,
            {
                attributes: { exclude: ['first_name', 'last_name', 'creation_date', 'update_date'] }
            }

        )
            .then(findUser => {
                user = findUser;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
        return user;
    } catch (error) {
        console.log(error);
    }

}




module.exports = {
    getById,
    getByIdLimit
};