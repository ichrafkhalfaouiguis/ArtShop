import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path='/search/:keyword' element={<HomeScreen />} />
    <Route path='/page/:pageNumber' element={<HomeScreen />} />
    <Route
      path='/search/:keyword/page/:pageNumber'
      element={<HomeScreen />}
    />
    <Route path='/product/:id' element={<ProductScreen />} />
    <Route path='/cart' element={<CartScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    {/* Registered users */}
    <Route path='' element={<PrivateRoute />}>
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
    </Route>
    {/* Admin users */}
    <Route path='' element={<AdminRoute />}>
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route
        path='/admin/productlist/:pageNumber'
        element={<ProductListScreen />}
      />
     
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
    </Route>
  </Route>
)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
