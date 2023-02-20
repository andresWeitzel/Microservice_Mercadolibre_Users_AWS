'use strict';
//Services
const { getById, getByIdLimit } = require('../../services/users/getById');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let user;
let userId;


/**
 * @description gets a user with all its attributes whose id matches the one passed as a parameter
 * @param {Object} event Object type
 * @returns a user according to his id
 */
module.exports.handler = async (event) => {
  try {
    user = null;
    userId = null;

    userId = await event.pathParameters.id;

    user = await getByIdLimit(userId);

    return await requestResult(statusCode.OK, user, event);

  } catch (error) {
    console.log(error);
  }

};
