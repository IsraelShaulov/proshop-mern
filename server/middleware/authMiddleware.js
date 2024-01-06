import { verifyJWT } from '../utils/tokenUtils.js';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
  // console.log(req.cookies);
  // verify the cookie(Read the JWT from the cookie)
  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  // verify the jwt is valid
  try {
    const { userId } = verifyJWT(token);
    // req.user = { userId: userId };
    req.user = await User.findById(userId).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
};

// Admin middleware
export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};
