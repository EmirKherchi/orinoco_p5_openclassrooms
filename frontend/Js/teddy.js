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



/******Création de l'objet Teddy Bear depuis le current produit (local storage)*****/
let currentProduct;

if (localStorage.getItem("currentProduct") === null) {
  nomDeLOurson.innerHTML = "Oups... une erreur s'est produite vous allez être redirigé vers notre page d'accueil";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
} else {
  currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
}

class thisTeddyBear {
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

/****** Création de l'instance******/

const thisTeddy = new thisTeddyBear(
  currentProduct[0].name,
  currentProduct[0].price,
  currentProduct[0].description,
  currentProduct[0].colors,
  currentProduct[0].id,
  currentProduct[0].image
);


// création du rendu dynamique 

thisTeddy.renderThisTeddy();

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
