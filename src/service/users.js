//Imports
const dbModel = require('../models/user');
const User = dbModel.User;
//Const/Vars
let usersList;
let user;


const getAll = async function () {
    try {
        usersList=null;
        await User.findAll()
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
        user=null;
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