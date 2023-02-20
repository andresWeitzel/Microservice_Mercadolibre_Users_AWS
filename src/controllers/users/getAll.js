'use strict';
//Services
const { getAll } = require('../../services/users');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;
const pageSizeNro = 5;
const pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description gets all paged users with all their attributes
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    userList = await getAll(pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK,userList, event);

  } catch (error) {
    console.log(error);
  }

};
