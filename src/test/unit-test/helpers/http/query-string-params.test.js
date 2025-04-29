'use strict';
//Helpers

//Enums
const {
  statusCode,
  statusCodeDetails,
} = require('../../../../enums/http/status-code');
const {
  validatePathParameters,
} = require('../../../../helpers/http/query-string-params');
//Const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
const MOCK_OBJECT_VALUE_01 = process.env.MOCK_OBJECT_VALUE_01;
const MOCK_OBJECT = { mock_object: MOCK_OBJECT_VALUE_01 };
const MOCK_NUMBER = process.env.MOCK_NUMBER_VALUE_01;
const MOCK_STRING = process.env.MOCK_STRING_VALUE_01;
const MOCK_BOOLEAN = process.env.MOCK_BOOLEAN_VALUE_01;
//Vars
let msg;
let validatePathParametersResult;

describe('- validatePathParameters helper (Unit test)', () => {
  //--Start first suite --
  describe('1) Check cases for arguments.', () => {
    msg =
      'Should return a boolean value if object type argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_OBJECT);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg =
      'Should return a boolean value if number type argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_NUMBER);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg =
      'Should return a boolean value if a string type argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_STRING);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg =
      'Should return a boolean value if a boolean type argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_BOOLEAN);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg =
      'Should return a boolean value if a null argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(null);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg =
      'Should return a boolean value if a undefined argument is passed ( This function expects one argument of type object ).';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(undefined);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });
  });

  describe('2) Check cases for error.', () => {
    msg = 'Should not thrown an Error if a new Error is passed for arguments.';
    it(msg, async () => {
      let newError = new Error();
      validatePathParametersResult = await validatePathParameters(newError);
      await expect(async () => validatePathParametersResult).not.toThrow(Error);
    });

    msg =
      'Should not thrown an Error if no arguments is passed to the function.';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters();
      await expect(async () => validatePathParametersResult).not.toThrow(Error);
    });
  });
});
