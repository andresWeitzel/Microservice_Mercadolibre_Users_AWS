'use strict';
//Services
const { getLikeLastName } = require('../../services/users/getLikeLastName');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;
let lastName;
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
    lastName = null;

    lastName = await event.pathParameters.lastName;


    userList = await getLikeLastName(lastName, pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);

  } catch (error) {
    console.log(error);
  }

};
