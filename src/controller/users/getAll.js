'use strict';
//Imports
const { getAll } = require('../../service/users');
const { requestSuccessful } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;
const pageSizeNro = 5;
const pageNro=0;
const orderBy = [
  ['id', 'ASC']
];

module.exports.handler = async (event) => {
  try {
    userList = null;
    userList = await getAll(pageSizeNro, pageNro, orderBy);

    return await requestSuccessful(userList, event);

  } catch (error) {
    console.log(error);
  }

};
