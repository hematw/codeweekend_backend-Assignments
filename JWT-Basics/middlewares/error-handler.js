const CustomApiError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomApiError){
        res.status(err.statusCode).json({error: err.message})
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message})
}

module.exports = errorHandler;