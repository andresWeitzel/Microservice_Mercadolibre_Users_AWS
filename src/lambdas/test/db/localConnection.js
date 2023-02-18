'use strict';

module.exports.handler = async (event) => {

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:'Test Local Connection',
        input: event,
      },
      null,
      2
    ),
  };
};
