import Order from '../models/orderModel.js';
import checkPermissions from '../utils/checkPermissions.js';

// @desc Create new order
// @route POST /api/v1/orders
// @access Private
export const createNewOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    orderItems: orderItems.map((eachOrder) => {
      // ...eachOrder = name,quantity,image,price from the orderModel
      return { ...eachOrder, product: eachOrder._id, _id: undefined };
    }),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc Get logged in user orders
// @route GET /api/v1/orders/myorders
// @access Private
export const getMyOrders = async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id }).sort({
    createdAt: 'desc',
  });
  res.status(200).json(myOrders);
};

// @desc Get order by id
// @route GET /api/v1/orders/:id
// @access Private
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  // handle that only the same user that have made the order can see the order.
  checkPermissions(req.user, order.user);

  res.status(200).json(order);
};

// @desc Update order to paid
// @route PATCH /api/v1/orders/:id/pay
// @access Private
export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updateOrder = await order.save();

  res.status(200).json(updateOrder);
};

// @desc    Update order to delivered
// @route   PATCH /api/v1/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json(updateOrder);
};

// @desc Get all orders
// @route GET /api/v1/orders
// @access Private/Admin route
export const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name')
    .sort({ createdAt: 'desc' });
  res.status(200).json(orders);
};
