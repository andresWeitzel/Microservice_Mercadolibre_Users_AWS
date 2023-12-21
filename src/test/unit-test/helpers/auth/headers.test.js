"use strict";
//Helpers
const { validateAuthHeaders } = require("../../../../helpers/auth/headers");
//Environment vars
const X_API_KEY = process.env.X_API_KEY;
//Const
const EVENT_HEADERS_MOCK = {};
const EVENT_HEADERS_WITH_API_KEY_INVALID = {
  'x-api-key' : 'f98d8cd98h73s204e3456998ecknaksdnakndkn'
};
const EVENT_HEADERS_WITH_API_KEY_VALID = {
  'x-api-key' : X_API_KEY
};
const EVENT_HEADERS_WITH_API_KEY_AUTH = {
  'x-api-key' : 'f9hjdbab32b1nb1n2204e3456998ecl9427j',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
};
//Vars
let msg;
let validateAuthHeadersResult;


describe("- validateAuthHeaders helper (Unit Test)", () => {
  describe("1) Check cases for argument.", () => {
    msg = "Should return a boolean if passed values to all parameters.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(EVENT_HEADERS_MOCK);
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean if passed other values.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(EVENT_HEADERS_MOCK, EVENT_HEADERS_MOCK);
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean if a null value is passed to the function.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(null);
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean if a undefined value is passed to the function.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(undefined);
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean if not value is passed to the function.";
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders();
      await expect(typeof validateAuthHeadersResult == "boolean").toBe(true);
    });
  });

  // describe("2) Check cases for event headers .", () => {
  //   msg = "Should return a boolean with true value if a correc x-api-key value is passed to the function.";
  //   it(msg, async () => {
  //     validateAuthHeadersResult = await validateAuthHeaders(EVENT_HEADERS_WITH_API_KEY_VALID);
  //     await expect(validateAuthHeadersResult == true).toBe(true);
  //   });

  //   msg = "Should return a boolean with true false if an incorrect x-api-key value is passed to the function.";
  //   it(msg, async () => {
  //     validateAuthHeadersResult = await validateAuthHeaders(EVENT_HEADERS_WITH_API_KEY_INVALID);
  //     await expect(validateAuthHeadersResult == false).toBe(true);
  //   });
  // });

});