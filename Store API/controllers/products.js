const asyncHandler = require("../middlewares/async-handler");
const Product = require("../models/Procuct");

const getAllProductsStatic = asyncHandler(async (req, res) => {
  const searchQuery = {};

  const products = await Product.find(searchQuery).sort("name -price");
  res.status(200).json({ products });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { name, company, price, featured, sort, numericFilters } = req.query;
  const searchQuery = {};

  if (name) searchQuery.name = { $regex: name, $options: "i" };
  if (company) searchQuery.company = { $regex: company, $options: "i" };
  if (price) searchQuery.price = price;
  if (featured) searchQuery.featured = featured;
  let sortBy = sort ? sort.split(",").join(" ") : {};
  let fields = req.query.fields ? req.query.fields.split(",").join(" ") : {};
  let limit = Number(req.query.limit) || 30;
  let skip = (Number(req.query.page) - 1) * limit || 0;

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const validFields = ["price", "rating"];
    const filterArray = numericFilters.split(",");
    
    filterArray.forEach((filter) => {
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      const [field, operator, value] = filter.split(regEx);

      if (validFields.includes(field) && operatorMap[operator]) {
        searchQuery[field] = { [operatorMap[operator]]: Number(value) };
      }
    });
  }

  const products = await Product.find(searchQuery)
    .sort(sortBy)
    .select(fields)
    .limit(limit)
    .skip(skip);
  res.status(200).json({ products });
});

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
