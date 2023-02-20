'use strict';
//Imports
const {dbConnection} = require('../../db/localConfig');
//Const/Vars
let msg;

module.exports.handler = async (event) => {

  try {
    msg = null;
    await dbConnection.authenticate()
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
