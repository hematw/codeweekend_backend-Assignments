const CustomApiError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err.errors.name);
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = errorHandler;
