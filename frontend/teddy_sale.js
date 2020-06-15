/****** Variables elements du dom******/
const nomDeLOurson = document.getElementById("title");
const imgOurson = document.getElementById("image");
const descriptionOurson = document.getElementById("description");
const price = document.getElementById("price");
const divBtnAddToCart = document.getElementById("divBtn"); //div contenant le btn
const btnAddToCart = document.getElementById("btn");
const numberEltCart = document.getElementById("number");
const id = document.getElementById("id");
const formChoixCouleurs = document.getElementById("choose-color");
const dropdownMenuCouleurs = document.getElementById("dropdown");
const norb = document.getElementById("norbert");
const arn = document.getElementById("arnold");
const lennyNCarl = document.getElementById("lennyandcarl");
const gus = document.getElementById("gustav");
const garf = document.getElementById("garfunkel");

/******Fetch et Promise******/

fetch("http://localhost:3000/api/teddies/")
  .then(function (response) {
    if (response.status !== 200) {
      console.log("erreur: " + response.status);
    }
    response.json().then(function (data) {
      localStorage.clear();
      localStorage.setItem("products", JSON.stringify(data));
    });
  })
  .catch(function (error) {
    console.log(error + " erreur fetch");
  });

/******Création de l'objet Teddy Bear******/

const product = JSON.parse(localStorage.getItem("products"));

class teddyBear {
  constructor(name, price, description, colors, id, image) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.colors = colors;
    this.id = id;
    this.image = image;
  }
  teddys() {
    nomDeLOurson.innerHTML = this.name;
    imgOurson.src = this.image;
    imgOurson.style.display = "block";
    descriptionOurson.innerHTML = this.description;
    id.innerHTML = this.id;
    id.style.display = "none";
    price.innerHTML = (this.price / 100).toFixed(2) + " €";
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
  product[0].name,
  product[0].price,
  product[0].description,
  product[0].colors,
  product[0]._id,
  product[0].imageUrl
);
const arnold = new teddyBear(
  product[1].name,
  product[1].price,
  product[1].description,
  product[1].colors,
  product[1]._id,
  product[1].imageUrl
);
const lennyAndCarl = new teddyBear(
  product[2].name,
  product[2].price,
  product[2].description,
  product[2].colors,
  product[2]._id,
  product[2].imageUrl
);
const gustav = new teddyBear(
  product[3].name,
  product[3].price,
  product[3].description,
  product[3].colors,
  product[3]._id,
  product[3].imageUrl
);
const garfunkel = new teddyBear(
  product[4].name,
  product[4].price,
  product[4].description,
  product[4].colors,
  product[4]._id,
  product[4].imageUrl
);
// création du rendu dynamique sur la page au click

const elementDeNavigation = [norb, arn, lennyNCarl, gus, garf];
const ours = [norbert, arnold, lennyAndCarl, gustav, garfunkel];

const statusSendTocartText = document.getElementById("issendtocart");

for (let i = 0; i < elementDeNavigation.length; i++) {
  elementDeNavigation[i].addEventListener("click", function () {
    if ((statusSendTocartText.style.display = "block")) {
      statusSendTocartText.style.display = "none";
    }

    ours[i].teddys();
  });
}

/****** Fonction ajout au panier******/
const bgColorAlert = "#ffc0cb";
const textAlert =
  "Veuillez Choisir la couleur de votre ours en peluche, avant ajout au panier";
const bgColorValidate = "#bcf5bc";
const textValidate = "Votre produit est bien ajouté au panier";

if (localStorage.getItem("cart") === null) {
  let panierInit = [];
  localStorage.setItem("cart", JSON.stringify(panierInit));
}
let cart = JSON.parse(localStorage.getItem("cart"));
numberEltCart.innerHTML = "(" + cart.length + ")";

const statusSendTocart = (bgColor, text) => {
  statusSendTocartText.style.backgroundColor = bgColor;
  statusSendTocartText.innerHTML = text;
  statusSendTocartText.style.display = "block";
};

/****** Fonction Pour ajout au panier******/
btnAddToCart.addEventListener("click", function () {
  if (dropdownMenuCouleurs.value === "Personalisez votre ourson") {
    statusSendTocart(bgColorAlert, textAlert);
  } else {
    cart.push([
      nomDeLOurson.textContent,
      dropdownMenuCouleurs.value,
      price.textContent,
      id.textContent,
    ]);

    localStorage.setItem("cart", JSON.stringify(cart)); //Ajout au local storage depuis le array local
    numberEltCart.innerHTML = "(" + cart.length + ")";

    statusSendTocart(bgColorValidate, textValidate);
  }
});
