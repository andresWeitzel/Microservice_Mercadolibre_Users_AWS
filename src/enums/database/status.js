/**
 * @description Provides symbolic names for some error codes based on the database connection.
 * @returns the symbolic name 
 * @example  CONNECTION_REFUSED --> ECCONNREFUSED
 */
const statusName = {
    CONNECTION_ABORTED: "ECCONNABORTED",
    CONNECTION_ALREADY_PROGRESS: "EALREADY",
    CONNECTION_REFUSED: "ECCONNREFUSED",
    CONNECTION_RESET: "ECCONNRESET",
    CONNECTION_ERROR: "ERROR",
};

/**
 * @description Provides a description for each type of connection state.
 * @returns the description according to status 
 * @example  CONNECTION_ERROR_DETAIL --> Error. An error has occurred with the connection or query to the database.
 */
const statusDetails = {
    CONNECTION_ERROR_DETAIL: "Error. An error has occurred with the connection or query to the database.",
    CONNECTION_REFUSED_DETAIL: `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`,
    
};

module.exports = { statusName, statusDetails };