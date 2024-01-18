'use strict';
//Helpers
const { requestResult } = require('../../../../helpers/http/body-response');
//Enums
const {
  statusCode,
  statusCodeDetails,
} = require('../../../../enums/http/status-code');
//Const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
//Vars
let msg;
let requestResultResult;

describe('- requestResult helper (Unit test)', () => {
  //--Start first suite --
  describe('1) Check cases for arguments.', () => {
    msg = 'Should return an object passing values to all parameters.';
    it(msg, async () => {
      requestResultResult = await requestResult(OK_CODE, OK_CODE_DETAILS);
      await expect(typeof requestResultResult == 'object').toBe(true);
    });

    msg =
      'Should return an object with the same values of the status code and the message passed as a parameter.';

    it(msg, async () => {
      requestResultResult = await requestResult(OK_CODE, OK_CODE_DETAILS);
      expect(typeof requestResultResult == 'object').toBe(true);

      expect(requestResultResult.statusCode == OK_CODE).toBe(true);

      let bodyConversion = JSON.parse(requestResultResult.body);

      let bodyConversionMessage = JSON.stringify(bodyConversion.message);

      expect(bodyConversionMessage == JSON.stringify(OK_CODE_DETAILS)).toBe(
        true,
      );
    });

    msg =
      'Should return an object with the value of the statusCode parameter of type any (Number or String)';

    it(msg, async () => {
      requestResultResult = await requestResult(
        BAD_REQUEST_CODE,
        BAD_REQUEST_CODE_DETAILS,
      );

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(
        typeof requestResultResult.statusCode == 'number' ||
          typeof requestResultResult.statusCode == 'string',
      ).toBe(true);
    });

    msg =
      'Should return an object with the value of the body parameter of type string';

    it(msg, async () => {
      requestResultResult = await requestResult(
        BAD_REQUEST_CODE,
        BAD_REQUEST_CODE_DETAILS,
      );

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(typeof requestResultResult.body == 'string').toBe(true);
    });

    msg = 'Should return an object if no parameters are passed.';

    it(msg, async () => {
      requestResultResult = await requestResult();

      expect(typeof requestResultResult == 'object').toBe(true);
    });

    msg =
      "Should return an object with the value undefined for statusCode and '{}' for body if no parameters are passed.";

    it(msg, async () => {
      requestResultResult = await requestResult();

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(requestResultResult.statusCode == undefined).toBe(true);

      expect(requestResultResult.body == '{}').toBe(true);
    });

    msg =
      'Should return an object with the value null for statusCode if null is passed as a parameter for statusCode argument.';

    it(msg, async () => {
      requestResultResult = await requestResult(null);

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(requestResultResult.statusCode == null).toBe(true);
    });

    msg =
      'Should return an object with string format for body if null is passed as a parameter for message argument.';

    it(msg, async () => {
      requestResultResult = await requestResult(BAD_REQUEST_CODE, null);

      console.log(typeof requestResultResult.body);

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(typeof requestResultResult.body == 'string').toBe(true);
    });

    msg =
      'Should return an object with the value undefined for statusCode if a value is not passed as a parameter for statusCode argument.';

    it(msg, async () => {
      requestResultResult = await requestResult();

      expect(typeof requestResultResult == 'object').toBe(true);

      expect(requestResultResult.statusCode == undefined).toBe(true);
    });
  });

  describe('2) Check cases for error.', () => {
    msg = 'Should return a boolean with value false if an new Error is passed';
    it(msg, async () => {
      await expect(async () => await requestResult(new Error())).not.toThrow(
        Error,
      );
    });
  });
});
