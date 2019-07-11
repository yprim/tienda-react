import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import CartView from './components/cartView';
import App from './App';
import ProductDetails from './components/productDetails';
import store from './redux_store/state';
import { set_cart_from_cookie, login_action } from './redux_store/actions';
import cookie from 'react-cookies';

let cart = cookie.load('carrito');
let user = cookie.load('usuario');

// Se carga el usuario y el carrito desde las cookies
if (cart !== undefined) {
  store.dispatch(set_cart_from_cookie(cart));
}

if (user !== undefined) {
  let data = {
    user: user,
    cart: cart !== undefined ? cart : []
  }
  store.dispatch(login_action(data));
}

const routing = (
  <Router>
    <div>
      <Route exact path="/"
        render={(props) => <App {...props} />} />
      <Route path="/carrito" component={CartView} />
      <Route path="/producto/:id" component={ProductDetails} />
    </div>
  </Router>
);

export default routing;