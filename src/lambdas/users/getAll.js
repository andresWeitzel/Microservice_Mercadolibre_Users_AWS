'use strict';
//Imports
const Users = require('../../service/users');
//Const/Vars
let userList;

module.exports.handler = async (event) => {
  try {
    userList=null;
    userList = await Users.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: userList,
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
  }

};
