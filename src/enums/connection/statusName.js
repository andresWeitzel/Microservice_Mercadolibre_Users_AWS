/**
 * @description Provides symbolic names for some error codes based on the database connection.
 * @returns the symbolic name 
 * @example  CONNECTION_REFUSED --> ECCONNREFUSED
 */
const statusName = {
    CONNECTION_REFUSED: ECCONNREFUSED,
}

module.exports = { statusCode }