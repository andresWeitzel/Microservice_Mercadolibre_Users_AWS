// const { Sequelize } = require('sequelize');

// function model(sequelize) {
//     const attributes = {
//         id: {
//             type: Sequelize.INTEGER, allowNull: false
//         },
//         nick_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         first_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         last_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         email: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         identification_type: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         identification_number: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         country_id: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         creation_date: {
//             type: Sequelize.DATE, allowNull: false
//         },
//         update_date: {
//             type: Sequelize.DATE, allowNull: false
//         }
//     };

//     return sequelize.define('User', attributes);
// }


// module.exports = { model };




// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("user", {
//         id: {
//             type: Sequelize.INTEGER, allowNull: false
//         },
//         nick_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         first_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         last_name: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         email: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         identification_type: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         identification_number: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         country_id: {
//             type: Sequelize.STRING, allowNull: false
//         },
//         creation_date: {
//             type: Sequelize.DATE, allowNull: false
//         },
//         update_date: {
//             type: Sequelize.DATE, allowNull: false
//         }
//     });

//     return User;
// };





const { DataTypes } = require('sequelize');
const db = require('../db/localConfig');
const sequelize = db.localConnection;

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER
        , allowNull: false
        , primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING
        , allowNull: false
    },
    first_name: {
        type: DataTypes.STRING
        , allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
        , allowNull: false
    },
    email: {
        type: DataTypes.STRING
        , allowNull: false
    },
    identification_type: {
        type: DataTypes.STRING
        , allowNull: false
    },
    identification_number: {
        type: DataTypes.STRING
        , allowNull: false
    },
    country_id: {
        type: DataTypes.STRING
        , allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE
        , allowNull: false
    },
    update_date: {
        type: DataTypes.DATE
        , allowNull: false
    }
},
    {
        timestamps: false
    });


//     User.findAll()
// .then(users => {
//   let usersString = JSON.stringify(users);
//   console.log(usersString);
// })
// .catch(error => {
//   console.log(error);
// })


module.exports = { User }

