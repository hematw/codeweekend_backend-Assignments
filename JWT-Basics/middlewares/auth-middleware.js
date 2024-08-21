const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomApiError("token not provided!", StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next();
  } catch (error) {
    throw new CustomApiError(
      "Not authorized to auccess this route",
      StatusCodes.UNAUTHORIZED
    );
  }
};

module.exports = authMiddleware;
