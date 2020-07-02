/*** Création du compteur dynamique ***/

const cart = JSON.parse(localStorage.getItem("cart"));
const numberEltCart = document.getElementById("number");

if (cart === null || cart.length < 1) {
  numberEltCart.innerHTML = "(0)";
} else {
  numberEltCart.innerHTML = "(" + cart.length + ")";
}

/*** Création de la liste des produits ***/
const teddysDiv = document.getElementById("products-list");
let btnInfo;

// récupération de la liste des produits depuis le local storage
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

// Création de la class
class teddyBear {
  constructor(name, price, description, colors, id, image) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.colors = colors;
    this.id = id;
    this.image = image;
  }
  renderListOfTeddys() {
    let teddyDiv = document.createElement("div");
    let teddyCardBody = document.createElement("div");
    let teddyImage = document.createElement("img");
    let teddyName = document.createElement("h4");
    let teddyPrice = document.createElement("p");
    btnInfo = document.createElement("button");

    teddyDiv.className = "products-list_teddy card col-md-12 col-lg-6";
    teddyImage.className = "card-img-top";
    teddyCardBody.className = "card-body";
    teddyName.className = "card-title";
    teddyPrice.className = "card-text";

    btnInfo.className = "btn btn-primary";

    teddyImage.src = this.image;
    teddyName.innerHTML = this.name;
    teddyPrice.innerHTML = (this.price / 100).toFixed(2) + " €";

    btnInfo.innerHTML = "Plus de détails";
    teddysDiv.appendChild(teddyDiv);
    teddyDiv.appendChild(teddyImage);
    teddyDiv.appendChild(teddyCardBody);
    teddyCardBody.appendChild(teddyName);
    teddyCardBody.appendChild(teddyPrice);

    teddyCardBody.appendChild(btnInfo);
    // teddyDivBtn.appendChild(btnInfo);
  }
}



const teddys = products.map(
  ({ name, price, description, colors, _id, imageUrl }) =>
    new teddyBear(name, price, description, colors, _id, imageUrl)
);

//application de la methode de classe pour toutes les instances


for (let i = 0; i < teddys.length; i++) {
  teddys[i].renderListOfTeddys();

  //Ajout a this current product dans le local storage lors du click
  btnInfo.addEventListener("click", function () {
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
    window.location.href = "teddy.html";
  });
}
