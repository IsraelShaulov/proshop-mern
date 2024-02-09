import express from 'express';
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
const router = express.Router();

import {
  authenticateUser,
  adminMiddleware,
} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.get('/', getAllProducts);
router.get('/top', getTopProducts);
router.post('/', authenticateUser, adminMiddleware, createProduct);
router.patch(
  '/:id',
  authenticateUser,
  checkObjectId,
  adminMiddleware,
  updateProduct
);
router.delete(
  '/:id',
  authenticateUser,
  checkObjectId,
  adminMiddleware,
  deleteProduct
);
router.get('/:id', checkObjectId, getSingleProduct);
router.post(
  '/:id/reviews',
  authenticateUser,
  checkObjectId,
  createProductReview
);

export default router;
