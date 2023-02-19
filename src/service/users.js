//Imports
const { User } = require('../models/user');
//Const/Vars
let usersList;
let user;
const nroPage=0;
const sizePage=5; 


const getAll = async function () {
    try {
        usersList = null;
        await User.findAll(
            {
                limit: sizePage,
                offset: nroPage,
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