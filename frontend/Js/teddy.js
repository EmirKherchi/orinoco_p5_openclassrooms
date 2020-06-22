/****** Variables elements du dom******/
const nomDeLOurson = document.getElementById("title");
const imgOurson = document.getElementById("image");
const descriptionOurson = document.getElementById("description");
const prixOurson = document.getElementById("price");
const id = document.getElementById("id");

const formChoixCouleurs = document.getElementById("choose-color");
const dropdownMenuCouleurs = document.getElementById("dropdown");

const divBtnAddToCart = document.getElementById("divBtn"); //div contenant le btn
const btnAddToCart = document.getElementById("btn");
const statusSendTocartText = document.getElementById("issendtocart");
const numberEltCart = document.getElementById("number");

const norb = document.getElementById("norbert");
const arn = document.getElementById("arnold");
const lennyNCarl = document.getElementById("lennyandcarl");
const gus = document.getElementById("gustav");
const garf = document.getElementById("garfunkel");

/******Création de l'objet Teddy Bear******/
let products;

if (localStorage.getItem("products") === null) {
  nomDeLOurson.innerHTML = "Oups... une erreur s'est produite veuillez revenir à notre page d'accueil";
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
  renderThisTeddy() {
    nomDeLOurson.innerHTML = this.name;
    imgOurson.src = this.image;
    imgOurson.style.display = "block";
    descriptionOurson.innerHTML = this.description;
    id.innerHTML = this.id;
    id.style.display = "none";
    prixOurson.innerHTML = (this.price / 100).toFixed(2) + " €";
    formChoixCouleurs.style.display = "block";
    divBtnAddToCart.style.display = "block";

    dropdownMenuCouleurs.options.length = 0;
    let defaultOption = document.createElement("option");
    defaultOption.text = "Personalisez votre ourson";
    dropdownMenuCouleurs.add(defaultOption);
    for (let i = 0; i < this.colors.length; i++) {
      let choice;
      choice = document.createElement("option");
      dropdownMenuCouleurs.add(choice);
      choice.innerHTML = this.colors[i];
    }
  }
}

/****** Création des instances******/

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

// création du rendu dynamique sur la page au click

const eltsSideMenu = [norb, arn, lennyNCarl, gus, garf];
const teddys = [norbert, arnold, lennyAndCarl, gustav, garfunkel];

for (let i = 0; i < eltsSideMenu.length; i++) {
  eltsSideMenu[i].addEventListener("click", function () {
    if ((statusSendTocartText.style.display = "block")) {
      statusSendTocartText.style.display = "none";
    }

    teddys[i].renderThisTeddy();
  });
}

/****** Init panier******/

if (localStorage.getItem("cart") === null) {
  let panierInit = [];
  localStorage.setItem("cart", JSON.stringify(panierInit));
}
let cart = JSON.parse(localStorage.getItem("cart"));
numberEltCart.innerHTML = "(" + cart.length + ")";

/****** Fonction Pour ajout au panier******/

const errorChoiceOfColor = () => {
  statusSendTocartText.style.backgroundColor = "#ffc0cb";
  statusSendTocartText.innerHTML = "Veuillez Choisir la couleur de votre ours en peluche, avant ajout au panier";
  statusSendTocartText.style.display = "block";
};

const addedToCart = () => {
  cart.push([
    nomDeLOurson.textContent,
    dropdownMenuCouleurs.value,
    prixOurson.textContent,
    id.textContent,
  ]);

  localStorage.setItem("cart", JSON.stringify(cart));

  numberEltCart.innerHTML = "(" + cart.length + ")";
  statusSendTocartText.style.backgroundColor = "#bcf5bc";
  statusSendTocartText.innerHTML = "Votre produit est bien ajouté au panier";
  statusSendTocartText.style.display = "block";
};

btnAddToCart.addEventListener("click", function () {
  if (dropdownMenuCouleurs.value === "Personalisez votre ourson") {
    errorChoiceOfColor();
  } else {
    addedToCart();
  }
});
