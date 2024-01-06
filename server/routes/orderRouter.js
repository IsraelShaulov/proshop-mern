import express from 'express';
const router = express.Router();
import {
  createNewOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import {
  authenticateUser,
  adminMiddleware,
} from '../middleware/authMiddleware.js';

router.get('/', authenticateUser, adminMiddleware, getAllOrders);
router.post('/', authenticateUser, createNewOrder);
router.get('/myorders', authenticateUser, getMyOrders);
router.get('/:id', authenticateUser, getOrderById);
router.patch('/:id/pay', authenticateUser, updateOrderToPaid);
router.patch(
  '/:id/deliver',
  authenticateUser,
  adminMiddleware,
  updateOrderToDelivered
);

export default router;
