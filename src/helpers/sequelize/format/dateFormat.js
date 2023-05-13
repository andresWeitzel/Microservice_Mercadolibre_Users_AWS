//Externals
const {
    Sequelize
} = require("sequelize");

/**
 * @description get a json object with dates format YYYY-MM-DD hh:mm:ss with sequelize functions for cretion_date and update_date
 * @returns a json with sequelize date format
 */
const getDateFormat = async () => {
    return {
        include: [
            [
              Sequelize.fn(
                "DATE_FORMAT",
                Sequelize.col("creation_date"),
                "%Y-%m-%d %H:%i:%s"
              ),
              "creation_date",
            ],
            [
                Sequelize.fn(
                  "DATE_FORMAT",
                  Sequelize.col("update_date"),
                  "%Y-%m-%d %H:%i:%s"
                ),
                "update_date",
              ],
        ]
    };
}

module.exports = {
    getDateFormat
}