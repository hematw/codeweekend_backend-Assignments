const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ["Nike", "Adidas", "Louis Vuitton", "Gucci", "New Urban"],
      message: "{VALUE} is not supported!",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
