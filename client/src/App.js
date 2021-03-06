import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './screens/Navbar/Navbar';
import HomeScreen from './screens/Home/Home';
import AboutScreen from './screens/AboutScreen';
import SigninScreen from './screens/SignIn/SignIn';
import SignupScreen from './screens/SignUp/Signup';
import Contact from './screens/Contact/Contact';
import Footer from './screens/Footer/Footer';
import ResetPassword from './components/auth/ResetPassword';
import NoPageFound from './screens/NoPageFound';
import ForgotPassword from './components/auth/ForgotPassword';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import Cart from './screens/CartScreen'
import CreateReview from './components/Rating/CreateReview';
import ProductScreen from './screens/ProductScreen'
import CreateProduct from './components/Product/CreateProduct';
import MyProducts from './components/Product/MyProducts';
import Profile from './screens/Profile';
import EditProduct from './components/Product/EditProduct';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen'




const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='content'>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route exact path='/signup' component={SignupScreen} />
          <Route path='/contact' component={Contact} />
          <Route path='/resetpassword/:token' component={ResetPassword} />
          <Route path='/forgot' component={ForgotPassword} />
          <Route path='/profile' component={Profile} />
          <Route path='/accountSetting' component={ProfileScreen} />
          <Route path='/order' component={ShippingAddressScreen} />
          <Route path='/payment' component={PaymentMethodScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/createProduct' component={CreateProduct} />
          <Route path='/myproducts' component={MyProducts} />
          <Route path='/edit/:id' component={EditProduct} />
          <Route path='/cart' component={Cart} />
          <Route path='/review/create/:id' component={CreateReview} />
          <Route component={NoPageFound} />
        </Switch>
      </div>
      <Footer className='footer' />
    </Router>
  );
};

export default App;
