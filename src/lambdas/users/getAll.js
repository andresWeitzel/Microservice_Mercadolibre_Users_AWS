'use strict';
//Imports
const { getAll } = require('../../service/users');
const { requestSuccessful } = require('../../helpers/http/bodyResponse');
//Const/Vars
let userList;

module.exports.handler = async (event) => {
  try {
    userList = null;
    userList = await getAll();

    return await requestSuccessful(userList, event);

  } catch (error) {
    console.log(error);
  }

};
