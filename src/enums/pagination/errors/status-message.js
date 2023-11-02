/**
 * @description message for type of sorting
 * @returns the message value
 * @example ORDER_BY_ERROR_MESSAGE --> "It is not possible to apply sorting based on the requested orderBy value. Invalid field"
 */
const sortingMessage = {
  ORDER_BY_ERROR_MESSAGE:
    'It is not possible to apply sorting based on the requested orderBy value. Invalid field',
  ORDER_AT_ERROR_MESSAGE:
    'It is not possible to apply sorting based on the requested orderAt value. Invalid field',
};

module.exports = {
  sortingMessage,
};
