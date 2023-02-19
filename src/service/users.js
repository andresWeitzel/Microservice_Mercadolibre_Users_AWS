

const dbModel = require('../models/user');
const User = dbModel.User;;

const getAll = async function () {
    await User.findAll()
        .then(users => {
            let usersString = JSON.stringify(users);
            console.log(usersString);
            return usersString;
        })
        .catch(error => {
            console.log(error);
        })
}


module.exports = {
    getAll
};