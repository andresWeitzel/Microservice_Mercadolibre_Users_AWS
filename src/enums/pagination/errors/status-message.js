/**
 * @description message name for type of sorting
 * @returns the message value
 * @example ORDER_BY_ERROR_MESSAGE --> "ORDER_BY_ERROR_MESSAGE"
 */
const sortingMessage = {
  ORDER_BY_ERROR_MESSAGE: "ORDER_BY_ERROR_MESSAGE",
  ORDER_AT_ERROR_MESSAGE: "ORDER_AT_ERROR_MESSAGE",
};

/**
 * @description message for type of sorting
 * @returns the message value
 * @example ORDER_BY_ERROR_MESSAGE --> "It is not possible to apply sorting based on the requested orderBy value. Invalid field"
 */
const sortingMessageDetail = {
  ORDER_BY_ERROR_MESSAGE_DETAIL:
    "It is not possible to apply sorting based on the requested orderBy value. Invalid field",
  ORDER_AT_ERROR_MESSAGE_DETAIL:
    "It is not possible to apply sorting based on the requested orderAt value. Invalid field",
};

module.exports = {
  sortingMessage,
  sortingMessageDetail,
};
