import path from 'path';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './db/connect.js';
import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import uploadRouter from './routes/uploadRouter.js';

connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/upload', uploadRouter);

app.get('/api/v1/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}...`));
