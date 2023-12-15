"use strict";
//Enums
const { statusCode, statusCodeDetails } = require("../../../../enums/http/status-code");
//Helpers
const { validateAuthHeaders } = require("../../../../helpers/auth/headers");
//Const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
const EVENT_HEADERS_MOCK = {};
//Vars
let msg;
let validateAuthHeadersResult;

describe("- validateAuthHeaders helper (Unit Test)", () => {
  describe("1) Check cases for argument.", () => {
    msg = "Should return a boolean passing values to all parameters.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(EVENT_HEADERS_MOCK);
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });

    // msg =
    //   "Should return an object with the same values of the status code and the message passed as a parameter.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders(OK_CODE, OK_CODE_DETAILS);
    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(validateAuthHeadersResult.statusCode == OK_CODE).toBe(true);

    //   let bodyConversion = JSON.parse(validateAuthHeadersResult.body);

    //   let bodyConversionMessage = JSON.stringify(bodyConversion.message);

    //   expect(bodyConversionMessage == JSON.stringify(OK_CODE_DETAILS)).toBe(
    //     true
    //   );
    // });

    // msg =
    //   "Should return an object with the value of the statusCode parameter of type any (Number or String)";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders(
    //     BAD_REQUEST_CODE,
    //     BAD_REQUEST_CODE_DETAILS
    //   );

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(
    //     typeof validateAuthHeadersResult.statusCode == "number" ||
    //       typeof validateAuthHeadersResult.statusCode == "string"
    //   ).toBe(true);
    // });

    // msg =
    //   "Should return an object with the value of the body parameter of type string";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders(
    //     BAD_REQUEST_CODE,
    //     BAD_REQUEST_CODE_DETAILS
    //   );

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(typeof validateAuthHeadersResult.body == "string").toBe(true);
    // });

    // msg = "Should return an object if no parameters are passed.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders();

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value undefined for statusCode and '{}' for body if no parameters are passed.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders();

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(validateAuthHeadersResult.statusCode == undefined).toBe(true);

    //   expect(validateAuthHeadersResult.body == "{}").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value null for statusCode if null is passed as a parameter for statusCode argument.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders(null);

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(validateAuthHeadersResult.statusCode == null).toBe(true);
    // });

    // msg =
    //   "Should return an object with string format for body if null is passed as a parameter for message argument.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders(BAD_REQUEST_CODE, null);

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(typeof validateAuthHeadersResult.body == "string").toBe(true);
    // });

    // msg =
    //   "Should return an object with the value undefined for statusCode if a value is not passed as a parameter for statusCode argument.";

    // it(msg, async () => {
    //   validateAuthHeadersResult = await validateAuthHeaders();

    //   expect(typeof validateAuthHeadersResult == "object").toBe(true);

    //   expect(validateAuthHeadersResult.statusCode == undefined).toBe(true);
    // });
  });
//   describe("2) Check cases for error.", () => {
//     msg = "Should return a boolean with value false if a new Error is passed";
//     it(msg, async () => {
//       await expect(async() => await validateAuthHeaders(new Error())).not.toThrow(Error);
//     });
//   });
});