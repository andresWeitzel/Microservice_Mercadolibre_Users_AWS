'use strict';

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: process.env.HELLO_TEST,
        input: event,
      },
      null,
      2
    ),
  };
};
