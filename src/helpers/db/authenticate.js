"use strict";
//dbConfig
const { dbConnection } = require("../../db/localConfig");
//Const/vars
let check;

/**
 * @description Check that a connection to the database can be established.
 * @returns a boolean depending on the connection to the db with sequelize
 */
const checkDbAuthentication = async function(){
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
};

module.exports = {
  checkDbAuthentication,
};
