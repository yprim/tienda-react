const api_url = 'localhost:44356/api/';
let myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
let headers = { headers: myHeaders };

async function getProducts() {

  // Descomentar esto y quitar lo de abajo
  // let response = await fetch(`${api_url}/product`, headers);
  // let json = await response.json();
  // console.log(json);
  // return json;


  return {
    products:
      [
        {
          name: 'shampoo ',
          id: '1',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '2',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '3',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '4',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '5',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '6',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '7',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '8',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '8',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '9',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '10',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '11',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '12',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '13',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '14',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '15',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '16',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '17',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '18',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '19',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '20',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '21',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }, {
          name: 'shampoo ',
          id: '22',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        },
        {
          name: 'shampoo ',
          id: '23',
          img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
          price: 12345,
          stock: 25,
          tax: 0
        }
      ]
  }
}

async function getProduct(id) {
  // let response = await fetch(`${api_url}/product/${id}`, headers);
  // let json = await response.json();
  // console.log(json);
  // return json;
  return {
    name: 'shampoo ',
    id: '1',
    img: 'http://www.adorit.com.uy/uploads/PP326.jpg',
    price: 12345,
    stock: 25,
    tax: 0
  }
}

async function getCart(userId) {
  return []
}

async function login(email, password) {
  // FIXME: recuperar el carrito en una consulta aparte
  let response = {};
  let userCart = await getCart(response.id);
  return {
    user: {
      email: email,
      password: password,
    },
    cart: userCart
  }
}

async function register(email, password) {
  return true;
}

async function removeToCart(userId, productId) {

}

async function addToCart(userId, productId, units) {

}

async function uploadCart(userId, cart) {
  for (let i in cart) {
    let productId = cart[i].id;
    let units = cart[i].units;
    await addToCart(userId, productId, units);
  }
}

export {
  getProducts,
  getProduct,
  login,
  register,
  addToCart,
  removeToCart,
  uploadCart
};
