const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    require: true,
  },
  productType: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});
const account = new mongoose.model('accounts', accountSchema);
const product = new mongoose.model('product', productSchema);
module.exports = { account, product };
