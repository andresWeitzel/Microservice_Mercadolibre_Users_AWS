'use strict';
//dbConfig
const { dbConnection } = require('../../db/local-config');
//Const
const CHECK_DB_AUTHENTICATION_ERROR =
  'ERROR in checkDbAuthentication helper function.';
//Vars
let check;
let dbConnectionResult;
let msgResponse;
let msgLog;

/**
 * @description Check that a connection to the database can be established.
 * @returns a boolean depending on the connection to the db with sequelize
 */
const checkDbAuthentication = async function () {
  check = false;
  dbConnectionResult = null;

  dbConnectionResult = await dbConnection
    .authenticate()
    .then(async () => {
      check = true;
      return check;
    })
    .catch(async (error) => {
      msgResponse = CHECK_DB_AUTHENTICATION_ERROR;
      msgLog = msgResponse + `Caused by ${error}`;
      console.log(msgLog);
      return msgResponse;
    });

  return dbConnectionResult;
};

module.exports = {
  checkDbAuthentication,
};
