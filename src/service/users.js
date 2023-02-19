//Imports
const dbModel = require('../models/user');
const User = dbModel.User;
//Const/Vars
let usersList;


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


module.exports = {
    getAll
};