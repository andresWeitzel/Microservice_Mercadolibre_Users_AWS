"use strict";
//External
const { Sequelize, Op } = require("sequelize");
//Const-vars
let msgResponse;
let msgLog;
let lowerFormat;

/**
 * @description get a json object with lower case format with sequelize functions according to the input parameter and column
 * @param {String} column String type
 * @param {any} parameter any type
 * @returns a json with sequelize lower case format
 */
const getLowerFormat = async (column, parameter) => {
  try {
    lowerFormat = Sequelize.where(
      Sequelize.fn("lower", Sequelize.col(column)),
      {
        [Op.like]: `%${parameter}%`,
      }
    );
    return lowerFormat;
  } catch (error) {
    msgResponse = "ERROR in getLowerFormat() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
};

module.exports = {
  getLowerFormat,
};
