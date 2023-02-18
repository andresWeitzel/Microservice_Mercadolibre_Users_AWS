
// const { Sequelize } = require('sequelize');


// module.exports = db = {};

// initialize();


// async function initialize() {
    
//     // connect to db
//     const sequelize = new Sequelize('microdb_mercadolibre', 'root', '', { dialect: 'mysql' });

//     // init models and add them to the exported db object
//     db.User = require('../models/user')(sequelize);

//     // sync all models with database
//     await sequelize.sync({ alter: true });
// }



module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'microdb_mercadolibre',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

