//elements des variables

const title = document.getElementById("title");
const img = document.getElementById("image");
const description = document.getElementById("description");
const price = document.getElementById("price");
const noSelection = document.getElementById("no-selection");
const divBtn = document.getElementById("btn"); //div contenant le btn
const numberEltCart = document.getElementById("number");

//elements menu de personalisation
const menu = document.getElementById("choose-color");
const dropdown = document.getElementById("dropdown");

//elements de navigation

const norb = document.getElementById("norbert");
const arn = document.getElementById("arnold");
const lennyNCarl = document.getElementById("lennyandcarl");
const gus = document.getElementById("gustav");
const garf = document.getElementById("garfunkel");

//fetch, appel de l'api et promesse

fetch("http://localhost:3000/api/teddies").then(function (response) {
  response.json().then(function (product) {
    //création de l'objet Teddybear.

    class teddyBear {
      constructor(name, price, description, colors, id, image) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.colors = colors;
        this.id = id;
        this.image = image;
      }
      //methode d'instances
      teddys() {
        noSelection.style.display = "none";
        title.innerHTML = this.name;
        img.src = this.image;
        img.style.display = "block";
        description.innerHTML = this.description;
        price.innerHTML = (this.price / 100).toFixed(2) + " €"; //divisé par 100, en gardant deux chiffres après la virgule
        menu.style.display = "block";
        divBtn.style.display = "block";

        dropdown.options.length = 0; //(re) mise  à zero du tableau options, pour ne pas conserver les anciennes valeurs du présent lors de l'ancien click.
        let defaultOption = document.createElement("option"); //creation de l'option par default
        defaultOption.text = "Personalisez votre ourson";
        dropdown.add(defaultOption); // ajout du texte par défaut, à l'option par defaut

        for (let i = 0; i < this.colors.length; i++) {
          let choice;
          choice = document.createElement("option"); // creation l'option vide de choix.
          dropdown.add(choice); //ajout de l'option au tableau dropdown
          choice.innerHTML = this.colors[i]; //ajout de la valeur à l'option dans le tableau
        }
      }
    }

    // création des instances

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

    // mise en place des evenements avec appel de la method teddys dans une fonction showTeddy.
    function showTeddy(eltNav, ours) {
      eltNav.addEventListener("click", function () {
        ours.teddys();
      });
    }
    // appel de la fonction avec le nom de l'element du dom et le nom de la constante en paramètre.
    showTeddy(norb, norbert);
    showTeddy(arn, arnold);
    showTeddy(lennyNCarl, lennyAndCarl);
    showTeddy(gus, gustav);
    showTeddy(garf, garfunkel);
  });
});

/******LE PANIER******/

//creation ou appel du panier client
if (localStorage.getItem("cart")) {
  //si le panier existe ne pas le créer ni l'initialiser
} else {
  console.log("nouvel utilisateur, création du panier");
  let panierInit = [];
  localStorage.setItem("cart", JSON.stringify(panierInit));
}

let cart = JSON.parse(localStorage.getItem("cart")); // le pannier est créer et est un array et récupère ses datas du local storage
numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur dans la navbar
console.log("voici les produits présents dans le panier " + cart);

//fonction ajoutant les produit dans le panier au click
divBtn.addEventListener("click", function () {
  cart.push([title.textContent,dropdown.value,price.textContent]); // ajoute un new array avec ses elements
  localStorage.setItem("cart", JSON.stringify(cart)); //Ajout au local storage
  numberEltCart.innerHTML = "(" + cart.length + ")"; //Ajout de l'element au compteur de la nav bar

  // window.confirm; //modal de confirmation pour continuer ou non le shopping
  // if (confirm("Voulez-vous voir votre panier ?")) {
  //   window.location.href = "cart.html";
  // } else {
  //   //reste sur la page produit
  // }
});

