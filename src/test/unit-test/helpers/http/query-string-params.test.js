"use strict";
//Helpers

//Enums
const {
  statusCode,
  statusCodeDetails,
} = require("../../../../enums/http/status-code");
const { validatePathParameters } = require("../../../../helpers/http/query-string-params");
//Const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
const MOCK_OBJECT= {mock_object:"MOCK_OBJECT"};
const MOCK_NUMBER= 12313;
const MOCK_STRING= "MOCK_STRING";
const MOCK_BOOLEAN= true;
//Vars
let msg;
let validatePathParametersResult;

describe("- validatePathParameters helper (Unit test)", () => {
  //--Start first suite --
  describe("1) Check cases for arguments.", () => {
    msg = "Should return a boolean value if object type argument is passed ( This function expects one argument of type object ).";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_OBJECT);
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean value if number type argument is passed ( This function expects one argument of type object ).";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_NUMBER);
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    
    msg = "Should return a boolean value if a string type argument is passed ( This function expects one argument of type object ).";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_STRING);
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean value if a boolean type argument is passed ( This function expects one argument of type object ).";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_BOOLEAN);
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    // msg =
    //   "Should return an object with the same values of the status code and the message passed as a parameter.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters(OK_CODE, OK_CODE_DETAILS);
    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(validatePathParametersResult.statusCode == OK_CODE).toBe(true);

    //   let bodyConversion = JSON.parse(validatePathParametersResult.body);

    //   let bodyConversionMessage = JSON.stringify(bodyConversion.message);

    //   expect(bodyConversionMessage == JSON.stringify(OK_CODE_DETAILS)).toBe(
    //     true
    //   );
    // });

    // msg =
    //   "Should return an object with the value of the statusCode parameter of type any (Number or String)";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters(
    //     BAD_REQUEST_CODE,
    //     BAD_REQUEST_CODE_DETAILS
    //   );

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(
    //     typeof validatePathParametersResult.statusCode == "number" ||
    //       typeof validatePathParametersResult.statusCode == "string"
    //   ).toBe(true);
    // });

    // msg =
    //   "Should return an object with the value of the body parameter of type string";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters(
    //     BAD_REQUEST_CODE,
    //     BAD_REQUEST_CODE_DETAILS
    //   );

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(typeof validatePathParametersResult.body == "string").toBe(true);
    // });

    // msg = "Should return an object if no parameters are passed.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters();

    //   expect(typeof validatePathParametersResult == "object").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value undefined for statusCode and '{}' for body if no parameters are passed.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters();

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(validatePathParametersResult.statusCode == undefined).toBe(true);

    //   expect(validatePathParametersResult.body == "{}").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value null for statusCode if null is passed as a parameter for statusCode argument.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters(null);

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(validatePathParametersResult.statusCode == null).toBe(true);
    // });

    // msg =
    //   "Should return an object with string format for body if null is passed as a parameter for message argument.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters(BAD_REQUEST_CODE, null);

    //   console.log(typeof validatePathParametersResult.body);

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(typeof validatePathParametersResult.body == "string").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value undefined for statusCode if a value is not passed as a parameter for statusCode argument.";

    // it(msg, async () => {
    //   validatePathParametersResult = await validatePathParameters();

    //   expect(typeof validatePathParametersResult == "object").toBe(true);

    //   expect(validatePathParametersResult.statusCode == undefined).toBe(true);
    // });
  });

//   describe("2) Check cases for error.", () => {
//     msg = "Should return a boolean with value false if an new Error is passed";
//     it(msg, async () => {
//       await expect(async () => await validatePathParameters(new Error())).not.toThrow(
//         Error
//       );
//     });
//   });
});
