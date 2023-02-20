'use strict';
//Services
const { getLikeNickname } = require('../../services/users');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;
let nickname;
const pageSizeNro = 5;
const pageNro = 0;
const orderBy = [
  ['id', 'ASC']
];

/**
 * @description get all paged users whose nickname matches the passed as parameter
 * @param {Object} event Object type
 * @returns a list of paginated users
 */
module.exports.handler = async (event) => {
  try {
    userList = null;
    nickname = null;

    nickname = await event.pathParameters.nickname;


    userList = await getLikeNickname(nickname, pageSizeNro, pageNro, orderBy);

    return await requestResult(statusCode.OK, userList, event);

  } catch (error) {
    console.log(error);
  }

};
