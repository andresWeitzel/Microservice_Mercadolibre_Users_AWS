/**
 * @description sequelize constraints and validations erros
 * @returns the name value of the constrainst or validation
 * @example UNIQUE_CONSTRAINT_ERROR --> "SequelizeUniqueConstraintError"
 */
const sequelizeConstraint = {
    /**
     * @description Unique constraint violation error
     */
    UNIQUE_CONSTRAINT_ERROR: "SequelizeUniqueConstraintError",
    /**
     * @description Foreign key constraint violation error
     */
    FOREIGN_KEY_CONSTRAINT_ERROR: "SequelizeForeignKeyContraintError",
    /**
     * @description Exclusion constraint violation error
     */
    EXCLUSION_CONSTRAINT_ERROR: "SequelizeExclusionConstraintError",
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
    CONNECTION_ERROR: "SequelizeConnectionError",
    /**
     * @description Database connection refused error
     */
    CONNECTION_REFUSED_ERROR: "SequelizeConnectionRefusedError",
    /**
     * @description Database invalid connection error
     */
    INVALID_CONNECTION_ERROR: "SequelizeInvalidConnectionError",
    /**
     * @description Database connection timed out error
     */
    CONNECTION_TIMEOUT_ERROR: "SequelizeConnectionTimedOutError",
  };

  module.exports = { sequelizeConstraint, sequelizeConnection };