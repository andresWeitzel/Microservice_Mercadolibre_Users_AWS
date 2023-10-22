//Const-vars
let msgResponse;
let msgLog;

/**
 * @description checks the order by value of the query string param to assign a field value
 * @param {String} orderBy String type
 * @returns a string with the field value or null
 */
const checkOrderBy = async (orderBy) => {
  try {
    msgResponse = null;
    msgLog = null;

    switch (orderBy.toLowerCase()) {
      case "id":
        orderBy = "id";
        break;
      case "nickname":
        orderBy = "nickname";
        break;
      case "first_name":
      case "firstname":
        orderBy = "first_name";
        break;
      case "last_name":
      case "lastname":
        orderBy = "last_name";
        break;
      case "email":
        orderBy = "email";
        break;
      case "identification_type":
      case "identificationtype":
        orderBy = "identification_type";
        break;
      case "identification_number":
      case "identificationnumber":
        orderBy = "identification_number";
        break;
      case "country_id":
      case "countryid":
        orderBy = "country_id";
        break;
      case "creation_date":
      case "creationdate":
        orderBy = "creation_date";
        break;
      case "update_date":
      case "updatedate":
        orderBy = "update_date";
        break;
      default:
        orderBy = null;
    }
    return orderBy;
  } catch (error) {
    msgResponse = "ERROR in checkOrderBy() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

/**
 * @description checks the order at value of the query string param to assign a field value
 * @param {String} orderAt String type
 * @returns a string with the field value or null
 */
const checkOrderAt = async (orderAt) => {
  try {
    msgResponse = null;
    msgLog = null;

    switch (orderAt.toLowerCase()) {
      case "asc":
        orderAt = "ASC";
        break;
      case "desc":
        orderAt = "DESC";
        break;
      default:
        orderAt = null;
    }
    return orderAt;
  } catch (error) {
    msgResponse = "ERROR in checkOrderAt() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
  checkOrderAt,
};
