//External
const { Sequelize } = require("sequelize");
//Enums
const { statusCode } = require("../enums/http/status-code");
//Const-vars
let msg;
let code;
let msgResponse;
let msgLog;

const dbConnection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    pool: {
      max: parseInt(process.env.DATABASE_POOL_MAX),
      min: parseInt(process.env.DATABASE_POOL_MIN),
      acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
      idle: parseInt(process.env.DATABASE_POOL_IDLE),
    },
  }
);

dbConnection
  .authenticate()
  .then(async () => {
    msg = "Connection has been established successfully.";
    code = statusCode.OK;
    console.log(msg);
  })
  .catch(async (error) => {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse =
      "ERROR in local-config db function. Unable to connect to the database";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

  });

module.exports = {
  dbConnection,
};
