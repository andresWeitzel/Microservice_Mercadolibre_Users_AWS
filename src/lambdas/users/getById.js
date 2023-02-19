'use strict';
//Imports
const { getById } = require('../../service/users');
const { requestSuccessful } = require('../../helpers/http/bodyResponse');
//Const/Vars
let user;
let userId;

module.exports.handler = async (event) => {
  try {
    user = null;
    userId = null;

    userId = await event.pathParameters.id;

    user = await getById(userId);

    return await requestSuccessful(user, event);

  } catch (error) {
    console.log(error);
  }

};
