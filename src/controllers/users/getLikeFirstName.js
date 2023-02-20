'use strict';
//Services
const { getLikeFirstName } = require('../../services/users');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;
let userName;
const pageSizeNro = 5;
const pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose first name matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    userName = null;

    userName = await event.pathParameters.firstName;


    userList = await getLikeFirstName(userName, pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);

  } catch (error) {
    console.log(error);
  }

};
