import React, { Component } from 'react';
import Login from './login';
import ShoppingCart from './shoppingCart';
import { Link } from 'react-router-dom';
import store from '../redux_store/state';
import { getProducts } from '../api_requests/requests';
import { update_products, search_products } from '../redux_store/actions';
import { withRouter } from 'react-router-dom';
import {
  Navbar,
  Form,
  FormControl,
  Button
}
  from 'react-bootstrap';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    
    this.handleTextChange = this.handleTextChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTextChange(evnt) {
    this.setState({
      text: evnt.target.value
    })
  }

  search() {
    if (this.state.text === '') return;
    let path = this.props.location.pathname;
    if (path === '/') {
      // Agregar la consulta al metodo buscar del api
      let products = [];
      store.dispatch(update_products(products))
    }
    else {
      store.dispatch(search_products(this.state.text));
    }
  }

  async reloadProducts() {
    let products = await getProducts();
    store.dispatch(update_products(products.products))
  }

  render() {
    return (
      <Navbar bg="light" sticky="top" expand="lg">
        <Link to="/" onClick={this.reloadProducts}>
          <Navbar.Brand href="#home">Tienda</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>

          <Form inline className="search-bar">
            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" onChange={this.handleTextChange} />
            <Link to="/" onClick={this.search}>
              <Button variant="outline-info"
                className="fa fa-search"
              />
            </Link>
          </Form>

          <div className="cart-login-section">
            <ShoppingCart />
            <Login />
          </div>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);