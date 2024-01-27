import Product from '../models/productModel.js';
import path from 'path';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';

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

// Admin Routes

// @desc Create a product
// @route POST /api/v1/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc Update a product
// @route PATCH /api/v1/products/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updateProduct = await product.save();
  res.status(200).json(updateProduct);
};

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private/Admin

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  // delete the image before delete all the product
  const __dirname = path.resolve();
  if (product.image.startsWith('/uploads')) {
    const filePath = path.join(__dirname, product.image);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: 'Product deleted' });
};
