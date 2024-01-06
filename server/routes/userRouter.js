import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
const router = express.Router();
import {
  authenticateUser,
  adminMiddleware,
} from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authenticateUser, getUserProfile);
router.patch('/profile', authenticateUser, updateUserProfile);
// admin
router.get('/', authenticateUser, adminMiddleware, getAllUsers);
router.get('/:id', authenticateUser, adminMiddleware, getUserById);
router.patch('/:id', authenticateUser, adminMiddleware, updateUser);
router.delete('/:id', authenticateUser, adminMiddleware, deleteUser);

export default router;
