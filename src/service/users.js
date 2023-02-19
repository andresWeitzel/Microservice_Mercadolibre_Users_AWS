//Imports
const { User } = require('../models/user');
//Const/Vars
let usersList;
let user;

/**
 * @description gets all paged users with all their attributes
 * @param pageSizeNro Number type
 * @param pageNro Number type
 * @param orderBy Array Object type
 * @returns a list of paginated users
 * @example 
 * [{"id":1,"nickname":"RAFA-CON","first_name":"Rafael","last_name":"Castro","email":"rafael_castro88@gmail.com","identification_type":"DNI","identification_number":"445938822","country_id":"AR","creation_date":"2023-02-12T15:03:04.000Z","update_date":"2023-02-12T15:03:04.000Z"},{"id".....]
 */
const getAll = async function (pageSizeNro, pageNro, orderBy) {
    try {
        usersList = null;
        await User.findAll(
            {
                limit: pageSizeNro,
                offset: pageNro,
                order: orderBy
            }
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

/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param id Number type
 * @returns a user according to his id
 * @example 
 * {"id":2,"nickname":"JAVIER GONZALEZ","first_name":"Javier","last_name":"Gonzalez","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR","creation_date":"2023-02-12T15:03:04.000Z","update_date":"2023-02-12T15:03:04.000Z"}
 */
const getById = async function (id) {
    try {
        user = null;
        await User.findByPk(id)
            .then(findUser => {
                user = JSON.stringify(findUser);
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
    getAll,
    getById
};