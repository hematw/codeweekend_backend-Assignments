const Product = require("../models/Procuct");

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
};
