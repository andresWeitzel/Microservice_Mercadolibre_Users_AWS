//External
const { DataTypes } = require('sequelize');
//DB
const { dbConnection } = require('../../db/local-config');

/**
 * @description database user model with their respective fields and constraints
 */
const User = dbConnection.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identification_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identification_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,

    tableName: 'users',
  },
);

module.exports = { User };
