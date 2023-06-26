"use strict";
//dbConfig
const { dbConnection } = require("../../db/localConfig");
//Const/vars
let check;

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
    console.error(
      `Error in checkDbAuthentication() function. Caused by ${error}. Specific stack is ${error.stack}`
    );
  }

  return check;
};

module.exports = {
  checkDbAuthentication,
};
