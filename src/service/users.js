// const db = require('../db/localConfig');



// async function getAll() {
//     return await db.User.findAll();
// }


// module.exports = {
//     getAll
// };


const User = require("../models/user");


async function getAll() {
    try {
        let users=await User.user.findAll();
        console.log(JSON.stringify(users, null, 2));
        return users;
    } catch (error) {
        console.log(error);
    }

};

 getAll();



module.exports = {
    getAll
};