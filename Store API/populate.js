const connect = require("./db/connect");
const Product = require("./models/Procuct");
const staticData = require("./products.json");
require("dotenv").config();

async function addData() {
  try {
    await connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.create(staticData);
    console.log("data added to DB");
    process.exit(0)
  } catch (error) {
    console.log(error + "❗");
    process.exit(1)
  }
}

addData();