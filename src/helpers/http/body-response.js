//Cont
const REQUEST_RESULT_ERROR_MESSAGE = 'ERROR in requestResult helper function.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description Get a json with the http status code, a message an
 * @param {Number} statusCode Number type
 * @param {String} message String type
 * @returns a json for the lambda response
 */
const requestResult = async (statusCode, message) => {
  try {
    return {
      statusCode: statusCode,
      body: JSON.stringify(
        {
          message: message,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    msgResponse = REQUEST_RESULT_ERROR_MESSAGE;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
};

module.exports = { requestResult };
