'use strict';
//External
const { Sequelize, Op } = require('sequelize');
//Const-vars
let msgResponse;
let msgLog;
let dateOnlyFormat;

/**
 * @description get a json object with date only format YYYY-MM-DD with sequelize functions according to input field
 * @param {String} column String type
 * @param {any} parameter any type
 * @returns a json with sequelize date format
 */
const getDateOnlyFormat = async (column, parameter) => {
  try {
    dateOnlyFormat = Sequelize.where(
      Sequelize.fn('DATE', Sequelize.col(column)),
      {
        [Op.eq]: parameter,
      },
    );
    return dateOnlyFormat;
  } catch (error) {
    msgResponse = 'ERROR in getDateOnlyFormat() helper function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
};

module.exports = {
  getDateOnlyFormat,
};
