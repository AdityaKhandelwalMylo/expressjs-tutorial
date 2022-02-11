const moment = require("moment");

const logger = async (req, res, next) => {
  console.log(
    `API called - ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } at ${moment().format()}`
  );
  next();
};

module.exports = logger;
