//Cont-vars
let msgResponse;
let msgLog;
/**
 * @description get a json with the http status code, a message an
 * @param {Number} statusCode Number type
 * @param {String} message String type
 * @returns a json for the lambda response
 */
const requestResult = async (statusCode, message) => {
  try {
    // if(typeof(message) == 'string') {
    //   return {
    //     statusCode: statusCode,
    //     body: JSON.stringify(
    //       {
    //         message: message,
    //       }
    //     ),
    //   };
    // }

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
    msgResponse = 'ERROR in requestResult() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
};

module.exports = { requestResult };