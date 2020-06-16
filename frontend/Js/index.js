
const cart = JSON.parse(localStorage.getItem("cart"));
const numberEltCart = document.getElementById("number");

if (cart === null || cart.length < 1) {
    numberEltCart.innerHTML = "(0)";
  } else {
    numberEltCart.innerHTML = "(" + cart.length + ")";
  }