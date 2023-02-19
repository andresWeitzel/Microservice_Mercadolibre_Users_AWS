'use strict';
//Imports
const {getById} = require('../../service/users');
//Const/Vars
let user;
let userId;

module.exports.handler = async (event) => {
  try {
    user=null;
    userId=null;

    userId = await event.pathParameters.id;

    user = await getById(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: user,
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
