'use strict';
//Helpers
const { validateAuthHeaders } = require('../../../../helpers/auth/headers');
//Environment vars
const MOCK_VALID_X_API_KEY_01 = process.env.X_API_KEY;
const MOCK_INVALID_X_API_KEY_01 = process.env.MOCK_INVALID_X_API_KEY_01;
const MOCK_VALID_AUTHORIZATION = process.env.BEARER_TOKEN;
const MOCK_INVALID_BEARER_TOKEN_01 = process.env.MOCK_INVALID_BEARER_TOKEN_01;
const MOCK_INVALID_BEARER_TOKEN_02 = process.env.MOCK_INVALID_BEARER_TOKEN_02;
//Const
const MOCK_EVENT_HEADERS = {};
const MOCK_EVENT_HEADERS_WITH_API_KEY_AUTH_INVALID = {
  headers: {
    'x-api-key': MOCK_INVALID_X_API_KEY_01,
    Authorization: MOCK_INVALID_BEARER_TOKEN_01,
  },
};
const EVENT_HEADERS_WITH_API_KEY_AUTH_VALID = {
  headers: {
    'x-api-key': MOCK_VALID_X_API_KEY_01,
    Authorization: MOCK_VALID_AUTHORIZATION,
  },
};
const EVENT_HEADERS_WITH_API_KEY_VALID_AUTH_INVALID = {
  headers: {
    'x-api-key': MOCK_VALID_X_API_KEY_01,
    Authorization: MOCK_INVALID_BEARER_TOKEN_02,
  },
};
//Vars
let msg;
let validateAuthHeadersResult;

describe('- validateAuthHeaders helper (Unit Test)', () => {
  describe('1) Check cases for argument.', () => {
    msg = 'Should return a boolean if passed values to all parameters.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(MOCK_EVENT_HEADERS);
      await expect(typeof validateAuthHeadersResult == 'boolean').toBe(true);
    });

    msg = 'Should return a boolean if passed other values.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(
        MOCK_EVENT_HEADERS,
        MOCK_EVENT_HEADERS,
      );
      await expect(typeof validateAuthHeadersResult == 'boolean').toBe(true);
    });

    msg = 'Should return a string if a null value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(null);
      await expect(typeof validateAuthHeadersResult == 'string').toBe(true);
    });

    msg =
      'Should return a string if a undefined value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(undefined);
      await expect(typeof validateAuthHeadersResult == 'string').toBe(true);
    });

    msg = 'Should return a string if not value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders();
      await expect(typeof validateAuthHeadersResult == 'string').toBe(true);
    });
  });

  describe('2) Check cases for event headers .', () => {
    msg =
      'Should return a boolean with true value if a correct x-api-key and MOCK_VALID_authorization value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(
        EVENT_HEADERS_WITH_API_KEY_AUTH_VALID,
      );
      await expect(validateAuthHeadersResult == true).toBe(true);
    });

    msg =
      'Should return a boolean with false value if a correct x-api-key and incorrect MOCK_VALID_authorization value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(
        EVENT_HEADERS_WITH_API_KEY_VALID_AUTH_INVALID,
      );
      await expect(validateAuthHeadersResult == false).toBe(true);
    });

    msg =
      'Should return a boolean with false value if a invalid x-api-key and MOCK_VALID_authorization value is passed to the function.';
    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(
        MOCK_EVENT_HEADERS_WITH_API_KEY_AUTH_INVALID,
      );
      await expect(validateAuthHeadersResult == false).toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg = 'Should not throw an error if a new Error() is passed as a parameter';

    it(msg, async () => {
      await expect(
        async () => await validateAuthHeaders(new Error()),
      ).not.toThrow(Error);
    });

    msg =
      'Should return a boolean with false value if a new Error() value is passed';

    it(msg, async () => {
      validateAuthHeadersResult = await validateAuthHeaders(new Error());

      await expect(typeof validateAuthHeadersResult == 'boolean').toBe(true);

      await expect(validateAuthHeadersResult == false).toBe(true);
    });
  });
});
