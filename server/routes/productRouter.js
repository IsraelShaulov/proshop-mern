import express from 'express';
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
const router = express.Router();

import {
  authenticateUser,
  adminMiddleware,
} from '../middleware/authMiddleware.js';

router.get('/', getAllProducts);
router.post('/', authenticateUser, adminMiddleware, createProduct);
router.patch('/:id', authenticateUser, adminMiddleware, updateProduct);
router.delete('/:id', authenticateUser, adminMiddleware, deleteProduct);
router.get('/:id', getSingleProduct);

export default router;
