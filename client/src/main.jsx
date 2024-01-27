import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store.jsx';
import {
  HomePage,
  LoginPage,
  OrderPage,
  PaymentPage,
  PlaceOrderPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
  ShippingPage,
  CartPage,
  OrderListPage,
  ProductListPage,
  ProductEditPage,
  UserListPage,
  UserEditPage,
} from './pages/index.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AdminRoute from './components/AdminRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      {/* user route */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      {/* admin route */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListPage />} />
        <Route path='/admin/productlist' element={<ProductListPage />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
        <Route path='/admin/userlist' element={<UserListPage />} />
        <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
