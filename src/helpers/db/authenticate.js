'use strict';
//dbConfig
const { dbConnection } = require('../../db/localConfig');
//Const/vars
let check;
let msgResponse;
let msgLog;

/**
 * @description Check that a connection to the database can be established.
 * @returns a boolean depending on the connection to the db with sequelize
 */
const checkDbAuthentication = async function () {
  try {
    await dbConnection
      .authenticate()
      .then(() => {
        check = true;
      })
      .catch((error) => {
        check = false;
        console.log(error);
      });
  } catch (error) {
    check = false;

    msgResponse = 'ERROR in checkDbAuthentication() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }

  return check;
};

module.exports = {
  checkDbAuthentication,
};
