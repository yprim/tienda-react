
const add_product = (product) => {
  return {
    type: 'add_product',
    payload: product
  }
}

const remove_product = (id) => {
  return {
    type: 'remove_product',
    payload: id
  }
}

const login_action = (user) => {
  return {
    type: 'login',
    payload: user
  }
}

const logout = () => {
  return {
    type: 'logout'
  }
}

const update_products = (products) => {
  return {
    type: 'update_products',
    payload: products
  }
}

const search_products = (text) => {
  return {
    type: 'search',
    payload: text
  }
}

const set_cart_from_cookie = (cart) => {
  return {
    type: 'cart_from_cookie',
    payload: cart
  }
}

const register_from_cart = (show_modal) => {
  return {
    type: 'register_from_cart',
    payload: show_modal
  }
}

export {
  add_product,
  remove_product,
  login_action,
  logout,
  update_products,
  search_products,
  set_cart_from_cookie,
  register_from_cart
}