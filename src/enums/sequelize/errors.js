/**
 * @description sequelize constraints and validations erros
 * @returns the name value of the constrainst or validation
 * @example UNIQUE_CONSTRAINT_ERROR --> "SequelizeUniqueConstraintError"
 */
const sequelizeConstraint = {
  /**
   * @description Unique constraint violation error
   */
  UNIQUE_CONSTRAINT_ERROR: 'SequelizeUniqueConstraintError',
  /**
   * @description Foreign key constraint violation error
   */
  FOREIGN_KEY_CONSTRAINT_ERROR: 'SequelizeForeignKeyContraintError',
  /**
   * @description Exclusion constraint violation error
   */
  EXCLUSION_CONSTRAINT_ERROR: 'SequelizeExclusionConstraintError',
};

/**
 * @description sequelize connection errors
 * @returns the name value of the connection
 * @example CONNECTION_ERROR --> "SequelizeConnectionError"
 */
const sequelizeConnection = {
  /**
   * @description Generic database connection error
   */
  CONNECTION_ERROR: 'SequelizeConnectionError',
  /**
   * @description Database connection refused error
   */
  CONNECTION_REFUSED_ERROR: 'SequelizeConnectionRefusedError',
  /**
   * @description Database invalid connection error
   */
  INVALID_CONNECTION_ERROR: 'SequelizeInvalidConnectionError',
  /**
   * @description Database connection timed out error
   */
  CONNECTION_TIMEOUT_ERROR: 'SequelizeConnectionTimedOutError',
};

/**
 * @description Provides a description for each type of connection state.
 * @returns the description according to status
 * @example  CONNECTION_ERROR_DETAIL --> ERROR. An error has occurred with the connection or query to the database.
 */
const sequelizeConnectionDetails = {
  CONNECTION_ERROR_DETAIL:
    'ERROR. An error has occurred with the connection or query to the database.Caused by SequelizeConnectionError.',
  CONNECTION_REFUSED_DETAIL:
    'ECONNREFUSED. An error has occurred in the process operations and queries with the database. Caused by SequelizeConnectionRefusedError.',
  INVALID_CONNECTION_ERROR_DETAIL:
    'INVALID CONNECTION ERROR.The connection to the database has invalid values for the set parameters. Caused by SequelizeInvalidConnectionError',
  CONNECTION_TIMEOUT_ERROR_DETAIL:
    'CONNECTION TIMEOUT ERROR.Unable to acquire a connection from the pool within the configured acquire timeout. Caused by SequelizeConnectionTimedOutError.',
};

module.exports = {
  sequelizeConstraint,
  sequelizeConnection,
  sequelizeConnectionDetails,
};
