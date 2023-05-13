const { idRegex } = require("../constants/regex");
const { dtoFail } = require("../utils/dto");

const idMatch = (req, res, next) => {
  const _id = req.params
  Object.keys(_id).forEach((id) => {
    if(idRegex.test(_id[id]) === true) {
      next()
    } else {
      return dtoFail(res, 'Invalid ID');
    }
  })
};

module.exports = idMatch;
