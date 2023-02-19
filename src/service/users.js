// const db = require('../db/localConfig');



// async function getAll() {
//     return await db.User.findAll();
// }


// module.exports = {
//     getAll
// };


const db = require("./../models/user");
const User = db.User;


// async function getAll() {
//     try {
//         let users=await User.findAll();
//         console.log(JSON.stringify(users, null, 2));
//         return users;
//     } catch (error) {
//         console.log(error);
//     }

// };

//  getAll();


    User.authenticate()
    .then(() => {
      console.log('Connect');
    })
    .catch((error => {
      console.log(error);
    }))

// User.findAll()
// .then(data=>{
//     console.log(data);
// })
// .catch(error=>{
//     console.log(error);
// })



module.exports = {
    getAll
};