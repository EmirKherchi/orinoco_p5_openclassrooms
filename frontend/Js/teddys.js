
const cart = JSON.parse(localStorage.getItem("cart"));
const numberEltCart = document.getElementById("number");

if (cart === null || cart.length < 1) {
    numberEltCart.innerHTML = "(0)";
  } else {
    numberEltCart.innerHTML = "(" + cart.length + ")";
  }


const teddysDiv = document.getElementById("products-list");
let btnInfo;

//
let products = [];

if (localStorage.getItem("products") === null) {
  nomDeLOurson.innerHTML =
    "Oups... une erreur s'est produite vous allez être redirigé vers notre page d'accueil";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
} else {
  products = JSON.parse(localStorage.getItem("products"));
}

class teddyBear {
  constructor(name, price, description, colors, id, image) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.colors = colors;
    this.id = id;
    this.image = image;
  }
  listOfTeddys() {
    let teddyDiv = document.createElement("div");
    let teddyDivBtn = document.createElement("div");
    let teddyName = document.createElement("h4");
    let teddyImage = document.createElement("img");
    let teddyPrice = document.createElement("p");
    btnInfo = document.createElement("button");

    teddyDiv.className = "text-center col-md-12 col-lg-6";
    btnInfo.className = "btn btn-primary";

    teddyImage.src = this.image;
    teddyName.innerHTML = this.name;
    teddyPrice.innerHTML = (this.price / 100).toFixed(2) + " €";

    btnInfo.innerHTML = "Plus de détail";
    teddysDiv.appendChild(teddyDiv);
    teddyDiv.appendChild(teddyName);
    teddyDiv.appendChild(teddyImage);
    teddyDiv.appendChild(teddyPrice);

    teddyDiv.appendChild(teddyDivBtn);
    teddyDivBtn.appendChild(btnInfo);
  }
}

const norbert = new teddyBear(
  products[0].name,
  products[0].price,
  products[0].description,
  products[0].colors,
  products[0]._id,
  products[0].imageUrl
);
const arnold = new teddyBear(
  products[1].name,
  products[1].price,
  products[1].description,
  products[1].colors,
  products[1]._id,
  products[1].imageUrl
);
const lennyAndCarl = new teddyBear(
  products[2].name,
  products[2].price,
  products[2].description,
  products[2].colors,
  products[2]._id,
  products[2].imageUrl
);
const gustav = new teddyBear(
  products[3].name,
  products[3].price,
  products[3].description,
  products[3].colors,
  products[3]._id,
  products[3].imageUrl
);
const garfunkel = new teddyBear(
  products[4].name,
  products[4].price,
  products[4].description,
  products[4].colors,
  products[4]._id,
  products[4].imageUrl
);

const teddys = [norbert, arnold, lennyAndCarl, gustav, garfunkel];

for (let i = 0; i < teddys.length; i++) {
  teddys[i].listOfTeddys();
  btnInfo.addEventListener("click", function () {
    window.location.href = "teddy.html";
    
    if (localStorage.getItem("currentProduct") === null) {
      let currentProduct = [];
      currentProduct.push(teddys[i]);
      localStorage.setItem("currentProduct", JSON.stringify(currentProduct));
    } else {
      localStorage.removeItem("currentProduct");
      let currentProduct = [];
      currentProduct.push(teddys[i]);
      localStorage.setItem("currentProduct", JSON.stringify(currentProduct));
    }
  });
}
