//Externals
const {
    Sequelize
} = require("sequelize");
//Const-vars
let dateFormat;

/**
 * @description get a json object with dates format YYYY-MM-DD hh:mm:ss with sequelize functions according to input field
 * @param {String} field String type
 * @returns a json with sequelize date format
 */
const getDateFormat = async (field) => {
  dateFormat =  { include: [
    [
      Sequelize.fn(
        "DATE_FORMAT",
        Sequelize.col(field),
        "%Y-%m-%d %H:%i:%s"
      ),
      field,
    ]
  ]
}
    return dateFormat.include[0];
}

module.exports = {
    getDateFormat
}