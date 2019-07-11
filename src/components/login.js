import React, { Component } from 'react';
import Buttom from 'react-bootstrap/Button';
import ReactModalLogin from 'react-modal-login';
import store from '../redux_store/state';
import { login_action, logout, register_from_cart } from '../redux_store/actions';
import { login, register, uploadCart   } from '../api_requests/requests';
import cookie from 'react-cookies';
import '../App.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      showModal: false,
      loading: false,
      error: null
    }

    store.subscribe(() => {
      this.setState({
        showModal: store.getState().showRegister
      })
    });

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
    this.afterTabsChange = this.afterTabsChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log(store.getState())
    if (JSON.stringify(store.getState().user) !== '{}') {
      this.setState({
        logged: true
      });
    }
    else {
      this.setState({
        logged: false
      });
    }
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });

    store.dispatch(register_from_cart(false));
  }

  onLoginSuccess(method, response) {
    console.log(response);
    console.log("logged successfully with " + method);
  }

  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response
    });
  }

  startLoading() {
    this.setState({
      loading: true
    });
  }

  finishLoading() {
    this.setState({
      loading: false
    });
  }

  afterTabsChange() {
    this.setState({
      error: null
    });
  }

  saveCookie(user) {
    cookie.save('usuario', user, { path: '/' });
  }

  prepareUserData (response) {
    // Si el carrito obtenido desde el login viene vacio se le asigna el 
    // carrito guardado en la cookie
    let user = response.user;
    let cart = response.cart;
    return {
      user: user,
      cart: cart.length === 0 ? store.getState().cart : cart
    }
  }

  async onLogin() {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let response = await login(email, password);
    if (response !== {}) {
      let user = response.user;
      let userData = this.prepareUserData(response);
      store.dispatch(login_action(userData));
      this.setState({
        logged: true
      });
      this.closeModal();
      uploadCart(user.id, userData.cart);
      this.saveCookie(user);
    }
    else {
      this.setState({
        error: true
      })
    }
  }

  async onRegister() {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let response = await register(email, password);
    if (response) {
      let user = {
        email: email,
        password: password
      }
      store.dispatch(login_action({
        user: user,
        cart: store.getState().cart
      }));
      this.setState({
        logged: true
      });
      this.closeModal();
      this.saveCookie(user);
    }

  }

  logout() {
    cookie.remove('usuario');
    store.dispatch(logout());
    this.setState({
      logged: false
    })
  }

  handleLogin() {
    this.state.logged ? this.logout() : this.openModal();
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <Buttom variant="inline"
          className={this.state.logged ? "fa fa-sign-out" : "fa fa-sign-in"}
          onClick={this.handleLogin}>
        </Buttom>
        {this.state.logged ? store.getState().user.email : ''}
        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Datos incorrectos, por favor intente de nuevo"
          }}
          registerError={{
            label: "Hubo un error en el registro, por favor intente de nuevo."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            loginBtn: {
              label: "Iniciar Sesión"
            },
            registerBtn: {
              label: "Registrarse"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Contraseña',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'contraseña',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Contraseña',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'contraseña',
              }
            ],
          }}
        />
      </div>
    );
  }
}

export default Login;