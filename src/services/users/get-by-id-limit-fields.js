// /**
//  * @description gets a user with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
//  * @param {Number} id Number type
//  * @returns a user according to his id
//  * @example
//  * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
//  */
// const getByIdLimit = async function (id) {
//   try {
//     user = null;
//     msg = null;

//     if (User != null) {
//       await User.findByPk(id, {
//         attributes: {
//           exclude: ['first_name', 'last_name', 'creation_date', 'update_date'],
//         },
//       })
//         .then((findUser) => {
//           user = findUser;
//         })
//         .catch((error) => {
//           msg = `Error in getByIdLimit User model. Caused by ${error}`;
//           console.error(`${msg}. Stack error type : ${error.stack}`);
//           user = statusName.CONNECTION_ERROR;
//         });
//     } else {
//       user = statusName.CONNECTION_REFUSED;
//     }
//   } catch (error) {
//     msg = `ERROR in getByIdLimit service function. Caused by ${error}`;
//     console.error(`${msg}. Stack error type : ${error.stack}`);
//     user = statusName.CONNECTION_ERROR;
//   }
//   return user;
// };


// module.exports = {
//     // getByIdLimit,
//   };