import React, { Component } from 'react';
import Header from './header';
import store from '../redux_store/state';
import { remove_product, register_from_cart } from '../redux_store/actions';
import emptyCart from '../empty-cart.png';

class CartView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      orderEmail: [],
      orderAddress: ''
    }
    store.subscribe(() => {
      let user = store.getState().user;
      this.setState({
        products: store.getState().cart,
        orderEmail: JSON.stringify(user) !== '{}' ? user.email : ''
      })
    })
    this.total = 0;
    this.getTotal = this.getTotal.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  componentDidMount() {
    let user = store.getState().user;
    this.setState({
      products: store.getState().cart
    });

    if (JSON.stringify(user) !== '{}') {
      this.setState({
        orderEmail: user.email
      })
    }
  }

  removeProduct(id) {
    store.dispatch(remove_product(id));
  }

  getTotal() {
    let total = 0;
    for (let i in this.state.products) {
      total += this.state.products[i].price * this.state.products[i].units + this.state.products[i].tax;
    }
    this.total = total;
  }

  onEmailChange(e) {
    this.setState({
      orderEmail: e.target.value
    })
  }

  onAddressChange(e) {
    this.setState({
      orderAddress: e.target.value
    })
  }

  handleOrder() {
    if (JSON.stringify(store.getState().user) !== '{}') {
      // Se ordena la orden y se limpia el carrito
    }
    else {
      // Se abre la vista del login
      store.dispatch(register_from_cart(true));
    }
  }

  renderProducts() {
    return (
      this.state.products.map((p, i) => {
        return (
          <tr key={i}>
            <td>
              <img src={p.img} className="product-img-cart" />
            </td>
            <td>
              <h3>{p.name}</h3>
            </td>
            <td>
              <h3>&#8353; {p.price}</h3>
            </td>
            <td>
              <h3>{p.units}</h3>
            </td>
            <td>
              <h3>{p.tax}</h3>
            </td>
            <td>&#8353; {p.price * p.units + p.tax}</td>
            <td>
              <button className="btn btn-danger" onClick={(e) => this.removeProduct(p.id)}>Eliminar</button>
            </td>
          </tr>
        )
      })
    )
  }

  render() {
    let cartView = <div>
      <Header />
      <div className="container">
        <div className="card">
          <table>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Cantidad</th>
              <th>Impuesto</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
            <tbody>
              {this.renderProducts()}
              <tr>
                {this.getTotal()}
                <th> Total</th>
                <th />
                <th />
                <th />
                <th />
                <th>&#8353; {this.total}</th>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="text-center">
            <h4>Detalles del pedido</h4>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                <input type="email" 
                       placeholder="Correo electrónico" 
                       value={this.state.orderEmail} 
                       onChange={this.onEmailChange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" 
                         placeholder="Dirección de envio" 
                         value={this.state.orderAddress} 
                         onChange={this.onAddressChange}/>
                </td>
              </tr>
              <tr>
                <button className="btn btn-primary"
                  style={{ marginBottom: '2%' }}
                  onClick={this.handleOrder}>
                  {JSON.stringify(store.getState().user) !== '{}' ? 'Realizar el pedido' : 'Registrese para finalizar su pedido'}
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    let emptyView = <div>
      <Header />
      <img src={emptyCart} className="img-empty "></img>
    </div>
    return (
      <div>
        {this.state.products.length > 0 ? cartView : emptyView}
      </div>
    );
  }
}

export default CartView;