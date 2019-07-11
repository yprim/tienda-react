import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import store from '../redux_store/state';
import cookie from 'react-cookies';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    // Se suscribe el estado el componente al estado global de redux
    store.subscribe(async () => {
      await this.setState({
        products: store.getState().cart
      })
      // Cada vez que se hace un cambio a los productos del carrito se actualiza la cookie
      this.saveCookie(this.state.products);
    });
  }

  saveCookie(cart) {
    cookie.remove('carrito', { path: '/' });
    cookie.save('carrito', JSON.stringify(cart), { path: '/' });
  }

  componentDidMount() {
    try {
      this.setState({
        products: store.getState().cart
      })
    }
    catch (e) {
      this.setState({
        products: 0
      })
    }
  }

  render() {
    return (
      <Link to="/carrito">
        <Button variant="inline" className="fa fa-shopping-cart">
          <Badge variant="light" hidden={this.state.products.length > 0 ? false : true}>
            {this.state.products.length}
          </Badge>
        </Button>
      </Link>
    );
  }
}

export default ShoppingCart;