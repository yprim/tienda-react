import React, { Component } from 'react';
import Header from './header';
import { getProduct, removeToCart as removeToCartAPI, addToCart as addToCartAPI } from '../api_requests/requests';
import store from '../redux_store/state';
import { add_product, remove_product } from '../redux_store/actions';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      img: '',
      stock: '',
      tax: '',
      count: 1,
      added: false
    }
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeToCart = this.removeToCart.bind(this);
    this.handleCartAction = this.handleCartAction.bind(this);
  }

  addProduct() {
    if (this.state.count < this.state.stock) {
      this.setState({
        count: this.state.count + 1,
      })
    }
  }

  /**
   * Disminuye la cantidad de unidades del producto
   */
  removeProduct() {
    // Logica de eliminar del carrito
    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1
      })
    }
  }

  /**
   * Agrega el pedido de x unidades de producto al carrito
   */
  async addToCart() {
    this.setState({
      added: true
    })
    let product = {
      name: this.state.name,
      id: this.state.id,
      price: this.state.price,
      img: this.state.img,
      tax: this.state.tax,
      units: this.state.count
    }
    store.dispatch(add_product(product));
    // Si el usuario esta logueado se actualiza su carrito
    let user = store.getState().user;
    if (JSON.stringify(user) !== '{}') {
      await addToCartAPI(user.id, product.id, product.units);
    }
  }

  /**
   * Elimina el pedido del producto del carrito
   */
  async removeToCart() {
    this.setState({
      added: false
    })
    store.dispatch(remove_product(this.props.id));
    // Si el usuario esta logueado se actualiza su carrito
    let user = store.getState().user;
    if (JSON.stringify(user) !== '{}') {
      await removeToCartAPI(user.id, this.props.id);
    }
  }

  handleCartAction() {
    this.state.added ? this.removeToCart() : this.addToCart();
  }

  async componentDidMount() {
    const { params } = this.props.match;
    // Obtiene la información del producto desde el api
    let productDetails = await getProduct(params.id);
    this.setState({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      img: productDetails.img,
      stock: productDetails.stock,
      tax: productDetails.tax,
      count: 1,
      added: false
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <img className="product-img-details" src={this.state.img} />
                  </div>
                  <div className="col text-center">
                    <h1>{this.state.name}</h1>
                    <table className="product-details">
                      <tbody>
                        <tr>
                          <td>Precio por unidad</td>
                          <td>&#8353; {this.state.price}</td>
                        </tr>
                        <tr>
                          <td>Unidades en Stock</td>
                          <td>{this.state.stock}</td>
                        </tr>
                        <tr>
                          <td>Impuesto</td>
                          <td> &#8353; {this.state.tax}</td>
                        </tr>
                        <tr>
                          <td>Cantidad</td>
                          <td>
                            <div className="stepper-input">
                              <span className="decrement" onClick={this.removeProduct}>-</span>
                              <input className="quantity" value={this.state.count} />
                              <span className="increment" onClick={this.addProduct}>+</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <span className={this.state.added ? "btn btn-danger" : "btn btn-primary"}
                      onClick={this.handleCartAction} >
                      {this.state.added ? "Quitar del carrito" : "Agregar al carrito"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;