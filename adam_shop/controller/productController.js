const { product } = require('../model/model.js');

const productController = {
  addProduct: async (req, res) => {
    try {
      const {
        nameProduct,
        productType,
        brand,
        price,
        quantity,
        color,
        size,
        description,
        image,
      } = req.body;
      const arrayInput = [
        nameProduct,
        productType,
        brand,
        price,
        quantity,
        color,
        size,
        description,
        image,
      ];
      //kiểm tra thông tin nhập vào có đầy đủ hay không
      const checkInputUndefined = arrayInput.every((value) => {
        return value !== undefined;
      });
      if (checkInputUndefined) {
        const newProduct = new product({
          nameProduct,
          productType,
          brand,
          price,
          quantity,
          color,
          size,
          description,
          image,
        });
        const Product = await newProduct.save();
        res.status(200).json('thêm thành công');
      } else {
        res.status(400).json('nhập thiếu thông tin sản phẩm');
      }
    } catch (err) {
      res.status(500).json('thêm không thành công');
    }
  },
};

module.exports = productController;
