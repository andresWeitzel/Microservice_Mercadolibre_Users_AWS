"use strict";
//Helpers
const {
  checkDbAuthentication,
} = require("../../../../helpers/db/authenticate");
//Const
const MOCK_BOOLEAN_VALUE = false;
//Vars
let msg;
let checkDbAuthenticationResult;

describe("- checkDbAuthentication helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a boolean type if no arguments are passed and the mysql service is running (this function don't has arguments) ";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication();
      await expect(typeof checkDbAuthenticationResult == "boolean").toBe(true);
    });

    msg =
      "Should return a boolean type if others arguments are passed and the mysql service is running (this function don't has arguments)";
    it(msg, async () => {
      checkDbAuthenticationResult = await checkDbAuthentication(MOCK_BOOLEAN_VALUE);
      await expect(typeof checkDbAuthenticationResult == "boolean").toBe(true);
    });

    msg =
    "Should return a boolean type if others arguments are passed and the mysql service is running (this function don't has arguments)";
  it(msg, async () => {
    checkDbAuthenticationResult = await checkDbAuthentication(null);
    await expect(typeof checkDbAuthenticationResult == "boolean").toBe(true);
  });


    // msg = "Should return a string type if a null value is passed";
    // it(msg, async () => {
    //   checkDbAuthenticationResult = await currentDateTime(null);
    //   await expect(typeof checkDbAuthenticationResult == "string").toBe(true);
    // });

    // msg = "Should return a string type if a undefined value is passed";
    // it(msg, async () => {
    //   checkDbAuthenticationResult = await currentDateTime(undefined);
    //   await expect(typeof checkDbAuthenticationResult == "string").toBe(true);
    // });
  });

  //   describe("2) Check cases for return.", () => {
  //     msg =
  //       "Should return a string type with 'DD/MM/YY HH:MM:SS' format (Ex: 2023-03-18 21:06:15)";
  //     it(msg, async () => {
  //       checkDbAuthenticationResult = await currentDateTime();
  //       await expect(typeof checkDbAuthenticationResult == "string").toBe(true);
  //       let characters = "/,:";
  //       let totalCharacters = 4; // total characters for DD/MM/YY HH:MM:SS
  //       let numberCharactersMatch = await calculateNumberOfCharactersMatch(
  //         checkDbAuthenticationResult,
  //         characters
  //       );
  //       await expect(numberCharactersMatch >= totalCharacters).toBe(true);
  //     });
  //   });

  //   describe("3) Check cases for error.", () => {
  //     msg =
  //       "Should not return a error message if no argument is passed to the function.";
  //     it(msg, async () => {
  //       await expect(async () => await currentDateTime()).not.toThrow(Error);
  //       checkDbAuthenticationResult = await currentDateTime();
  //       await expect(typeof checkDbAuthenticationResult == "string").toBe(true);
  //     });

  //     msg =
  //       "Should return a string and not throw an Error if a new Error is passed";
  //     it(msg, async () => {
  //       checkDbAuthenticationResult = await currentDateTime(new Error());
  //       await expect(async () => checkDbAuthenticationResult).not.toThrow(Error);
  //       await expect(typeof checkDbAuthenticationResult == "string").toBe(true);
  //     });
  //   });
});
