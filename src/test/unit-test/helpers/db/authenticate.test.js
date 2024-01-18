'use strict';
//Helpers
const {
  checkDbAuthentication,
} = require('../../../../helpers/db/authenticate');
//Const
const MOCK_BOOLEAN_VALUE = false;
//Vars
let msg;
let checkDbAuthenticationResult;

describe('- checkDbAuthentication helper (Unit Test)', () => {
  describe('1) Check cases for arguments.', () => {
    msg =
      "Should return a boolean type if no arguments are passed and the mysql service is running (this function don't has arguments) ";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication();
      await expect(typeof checkDbAuthenticationResult == 'boolean').toBe(true);
    });

    msg =
      "Should return a boolean type if others arguments are passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(
        MOCK_BOOLEAN_VALUE,
      );
      await expect(typeof checkDbAuthenticationResult == 'boolean').toBe(true);
    });

    msg =
      "Should return a boolean type if null value is passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(null);
      await expect(typeof checkDbAuthenticationResult == 'boolean').toBe(true);
    });

    msg =
      "Should return a boolean type if undefined value is passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(undefined);
      await expect(typeof checkDbAuthenticationResult == 'boolean').toBe(true);
    });
  });

  describe('2) Check cases for return.', () => {
    msg =
      "Should return a boolean type with true value if no arguments are passed and the mysql service is running (this function don't has arguments) ";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(undefined);
      await expect(checkDbAuthenticationResult == true).toBe(true);
    });

    msg =
      "Should return a boolean type with true value if others arguments are passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(
        MOCK_BOOLEAN_VALUE,
      );
      await expect(checkDbAuthenticationResult == true).toBe(true);
    });

    msg =
      "Should return a boolean type with true value if null value is passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(null);
      await expect(checkDbAuthenticationResult == true).toBe(true);
    });
    msg =
      "Should return a boolean type with true value if undefined value is passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(undefined);
      await expect(checkDbAuthenticationResult == true).toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg =
      "Should not return a error message if no argument is passed to the function and the mysql service is running (this function don't has arguments).";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication();
      await expect(async () => checkDbAuthenticationResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if no argument is passed to the function and the mysql service is running (this function don't has arguments).";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication();
      await expect(async () => checkDbAuthenticationResult).not.toThrow(Error);
    });
  });
});
