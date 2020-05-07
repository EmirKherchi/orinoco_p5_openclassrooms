const numberEltCart = document.getElementById("number");
const totalCart = document.getElementById("prixTotal");
const table = document.getElementById("tableau");
const newLigne = document.createElement("tr");
let newCol;
let total = 0; //init d'un variable qui récupèrera la somme du tableau des prix
const mainHtml = document.querySelector(".cart"); //main html
/*****************/
const cart = JSON.parse(localStorage.getItem("cart")); //récupération des elements dans le local storage
numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur de la navbar
/*************/

if (cart.length < 1) {
  //si le panier est vide
  mainHtml.style.display = "none"; // ne pas afficher les elements tableau et formulaire
  const cartEmpty = document.createElement("div"); // créer une DIV
  cartEmpty.innerHTML =
    "<h1>Votre panier est vide !<br>Retrouvez nos différents produits sur notre page d'accueil.</h1>"; // ajouter ce message en H1 à la div
  cartEmpty.style.marginTop = "250px";
  cartEmpty.style.lineHeight = "80px";
  document.body.appendChild(cartEmpty); //Ajouter la div  au body.
} else {
  /**Creation du tableau si le panier comporte des éléments**/
  for (let i = 0; i < cart.length; i++) {
    let newLigne = document.createElement("tr"); //créer une nouvelle ligne
    table.appendChild(newLigne); //ajoute la ligne au tableau
    newLigne.className += "tableLine"; //donne la class tableLigne à ts les elements newligne

    for (let j = 0; j < cart[i].length; j++) {
      newCol = document.createElement("th"); //créer une nouvelle colonne;
      newLigne.appendChild(newCol); //ajoute la colone à la ligne créer précedement
      newCol.innerHTML = cart[i][j]; // ajoute les information  du array produit dans le array cart aux colonnes
    }
  }

  /**creation d'un button remove et récupération des prix totaux / suppression de la colonne ID**/
  const line = document.getElementsByClassName("tableLine"); //pointe toutes les nouvelles lignes
  const totalPrice = []; //tableau vide pour ajout des prix par article

  for (i = 0; i < line.length; i++) {
    const btn = document.createElement("button"); //créer un bouton par nombre de ligne
    btn.className += "btnLine"; //donne leur la classe btnLine
    line[i].appendChild(btn); //pour chaque ligne donne un btn nouvellement créer
    btn.innerHTML = "X";

    const allPrice = line[i].cells[2].textContent; //récupération des cellules contenant le prix de chaque article
    const allID = line[i].cells[3]; //suppression de la colonne avec tous les ID produit visible, IDs uniquement présent dans le cart.
    allID.style.display = "none";
    totalPrice.push(parseFloat(allPrice)); // ajout des prix au tableau pour le total
  }
  for (let i = 0; i < totalPrice.length; i++) {
    total += totalPrice[i]; //ajout de la somme des prix du array à total
  }
  totalCart.innerHTML =
    total + " €" + "<br>Nombre d'articles dans le panier: " + cart.length;

  /**ajout de la fonctionnalité suppression de la ligne lors du click sur le btn remove**/
  const removeBtn = document.getElementsByClassName("btnLine"); //ajout d'un class à la list de btn
  for (let j = 0; j < removeBtn.length; j++) {
    //pour chaque btn de list
    removeBtn[j].addEventListener("click", function () {
      cart.splice(j, 1); //supprime la ligne correspondante à l'index du btn
      localStorage.setItem("cart", JSON.stringify(cart)); //envoi les info du cart au localstorage
      location.reload(true); //rafraichi la page
    });
  }
}

/***Elements form***/

const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const adresse = document.getElementById("adress");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

const btnSubmit = document.getElementById("envoiDuPanier");
const regexLettersOnly = /^[a-zA-Z]+$/;
const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const regexAdress = /^[A-Za-z0-9 -]*[A-Za-z0-9][A-Za-z0-9 -]*$/;
const regexCity = /^[A-Za-z0-9 -]*[A-Za-z0-9][A-Za-z0-9 -]*$/;


let products = []; //init du tableau contenant les id des différents produits dans le panier
let send

function getObjetID() { //function pour récupérer tout les id produit du tableau html
  products = []; // [re]mise à zero du tableau
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i][3]); // ajout des id dans le tableau products
  }
  
}
getObjetID(); // appel de la fonction pour récupéré les id des produits

JSON.parse(products[0]);

let contact = { // création de l'objet contact
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

function checkFormInput() {// vérification de tout les champs un par un et ajout des valeurs au key de contact
  if (regexLettersOnly.test(fName.value) == false) {
    //Regex prénom
    alert("Le champs prénom est éronné");
  } else {
    contact.firstName = fName.value;

    if (regexLettersOnly.test(lName.value) == false) {
      //Regex nom
      alert("Le champs nom est éronné");
    } else {
      contact.lastName = lName.value;

      if (regexAdress.test(adresse.value) == false) {
        //Regex adresse
        alert("Le champs adresse est éronné");
      } else {
        contact.address = adresse.value;

        if (regexCity.test(ville.value) == false) {
          //Regex ville
          alert("Le champs ville est éronné");
        } else {
          contact.city = ville.value;

          if (regexEmail.test(mail.value) == false) {
            //Regex nom
            alert("Le champs Email est éronné");
          } else {
            contact.email = mail.value;
            send = {contact,products}
            console.log(typeof(send));
            console.log(send);
            //lorsque tout est vérifié envoi des données au serveur
           fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                hearders:{
                  'Content-type': 'application/json' //je t'envoi du json
                },
                body: JSON.stringify(send)
              })
          }
        }
      }
    }
  }
}



envoiDuPanier.addEventListener("click", function (e) {
  e.preventDefault();
  checkFormInput();
  
});






