import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/v1/products
// @access Public
export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);
};

// @desc Fetch single product
// @route GET /api/v1/products/:id
// @access Public
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const singleProduct = await Product.findById(id);
  if (!singleProduct) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(singleProduct);
};
