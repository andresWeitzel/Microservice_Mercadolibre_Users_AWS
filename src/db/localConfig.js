
const { Sequelize } = require('sequelize');


const localConnection = new Sequelize('microdb_mercadolibre', 'root', '', { host: 'localhost', dialect: 'mysql' });


module.exports = {
  localConnection
}