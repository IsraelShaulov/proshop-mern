import User from '../models/userModel.js';
import { createJWT } from '../utils/tokenUtils.js';
import { attachCookies } from '../utils/attachCookies.js';

// @desc Login user & get token
// @route POST /api/v1/users/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide all values');
  }

  const user = await User.findOne({ email });

  // user not exists
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // create jwt
  const token = createJWT({ userId: user._id });
  // create cookie
  attachCookies({ res, token });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    // isAdmin: user.isAdmin,
  });
};

// @desc Register user
// @route POST /api/v1/users/register
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(400);
    throw new Error('Please provide all values');
  }

  const emailAlreadyExists = await User.findOne({ email });

  // user already exists with this email
  if (emailAlreadyExists) {
    res.status(400);
    throw new Error('This Email already in use');
  }

  const user = await User.create({ name, email, password });

  // create jwt
  const token = createJWT({ userId: user._id });
  // create cookie
  attachCookies({ res, token });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    // isAdmin: user.isAdmin,
  });
};

// @desc Logout user
// @route POST /api/v1/users/logout
// @access Private
export const logoutUser = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: 'user logged out successfully' });
};

// @desc Get user profile
// @route GET /api/v1/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  const userProfile = await User.findById({ _id: req.user._id });
  if (!userProfile) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({
    _id: userProfile._id,
    name: userProfile.name,
    email: userProfile.email,
    isAdmin: userProfile.isAdmin,
  });
};

// @desc update user profile
// @route PATCH /api/v1/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
};

// Admin actions

// @desc Get all users(admin route)
// @route GET /api/v1/users
// @access Private/Admin
export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// @desc Get single user by id(admin route)
// @route GET /api/v1/users/:id
// @access Private/Admin
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
};

// @desc update user by id(admin route)
// @route PATCH /api/v1/users/:id
// @access Private/Admin
export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  // user.isAdmin = Boolean(req.body.isAdmin);
  // user.isAdmin = req.user._id.equals(req.params.id)
  //   ? user.isAdmin
  //   : Boolean(req.body.isAdmin);

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    // isAdmin: updatedUser.isAdmin,
  });
};

// @desc Delete user(admin route)
// @route GET /api/v1/users/:id
// @access Private/Admin
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('Cannot delete admin user');
  }

  await User.deleteOne({ _id: user._id });
  res.status(200).json({ message: 'User deleted successfully' });
};
