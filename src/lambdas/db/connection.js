'use strict';
//Imports
const db = require('../../db/localConfig');
//Const/Vars
const sequelize = db.localConnection;
let msg;

module.exports.handler = async (event) => {

  try {
    msg = null;
    await sequelize.authenticate()
      .then(() => {
        msg = 'Connection has been established successfully.';
        console.log(msg);
      }).catch((error) => {
        msg = 'Unable to connect to the database: ', error;
        console.log(msg);
      });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: msg,
          input: event,
        },
        null,
        2
      ),
    };

  } catch (error) {
    console.log(error);
  }


};
