"use strict";
//dbConfig
const { dbConnection } = require("../../db/local-config");
//Const
const CHECK_DB_AUTHENTICATION_ERROR =
  "ERROR in checkDbAuthentication helper function.";
//Vars
let check;
let msgResponse;
let msgLog;

/**
 * @description Check that a connection to the database can be established.
 * @returns a boolean depending on the connection to the db with sequelize
 */
const checkDbAuthentication = async function () {
  try {
    check = false;
    await dbConnection
      .authenticate()
      .then(() => {
        check = true;
      })
      .catch((error) => {
        check = false;
        console.log(error);
      });
    return check;
  } catch (error) {
    check = false;
    msgResponse = CHECK_DB_AUTHENTICATION_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  checkDbAuthentication,
};
