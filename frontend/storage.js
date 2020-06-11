//elements du tableau html

const numberEltCart = document.getElementById("number");
const totalCart = document.getElementById("prixTotal");
const table = document.getElementById("tableau");
const newLigne = document.createElement("tr");
let newCol;
let total = 0; //init d'un variable qui récupèrera la somme du tableau des prix
const mainHtml = document.querySelector(".cart"); //main html
const loadingSpinner = document.querySelector(".lds-spinner");

const cart = JSON.parse(localStorage.getItem("cart")); //récupération des elements dans le local storage

if (cart === null || cart.length < 1) {
  //si le panier est vide
  numberEltCart.innerHTML = "(0)";
  mainHtml.style.display = "none"; // ne pas afficher les elements tableau et formulaire
  const cartEmpty = document.createElement("div"); // créer une DIV
  cartEmpty.innerHTML =
    "<h1>Oups...</h1><br><h3>Votre panier est vide !<br>Retrouvez nos différents produits sur notre page d'accueil.</h3>"; // ajouter ce message en H1 à la div
  cartEmpty.style.marginTop = "250px";
  cartEmpty.style.lineHeight = "80px";
  cartEmpty.style.textAlign = "center";
  document.body.appendChild(cartEmpty); //Ajouter la div  au body.
} else {
  //si le panier n'est pas vide
  numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur de la navbar
  
 

  /**Creation du tableau si le panier comporte des éléments**/
  for (let i = 0; i < cart.length; i++) {
    let newLigne = document.createElement("tr"); //créer une nouvelle ligne
    table.appendChild(newLigne); //ajoute la ligne au tableau
    newLigne.className += "tableLine"; //donne la class tableLigne à ts les elements newligne

    for (let j = 0; j < cart[i].length; j++) {
      newCol = document.createElement("th"); //créer une nouvelle colonne;
      newLigne.appendChild(newCol); //ajoute la colone à la ligne créer précedement
      newCol.innerHTML = cart[i][j]; // ajoute les information des array produit présent dans le array cart aux colonnes
    }
  }

  /**creation d'un button remove /récupération des prix totaux / suppression de la colonne ID**/
  const line = document.getElementsByClassName("tableLine"); //pointe toutes les nouvelles lignes
  const totalPrice = []; //tableau vide pour ajout des prix par article

  for (i = 0; i < line.length; i++) {
    const btn = document.createElement("button"); //créer un bouton par nombre de ligne
    btn.className += "btnLine"; //donne leur la classe btnLine
    line[i].appendChild(btn); //pour chaque ligne donne un btn nouvellement créer
    btn.innerHTML = "X";

    const allPrice = line[i].cells[2].textContent; //récupération des cellules contenant le prix de chaque article
    const allID = line[i].cells[3]; // récupération de toutes les cellules contenant les ID produits
    allID.style.display = "none"; // suppresion de l'affichage des id produits

    totalPrice.push(parseFloat(allPrice)); // ajout des prix au array pour le total
  }
  for (let i = 0; i < totalPrice.length; i++) {
    total += totalPrice[i]; //ajout de la somme des prix du array totalPrice à  la variable number total
  }
  totalCart.innerHTML =
    total + " €" + "<br>Nombre d'articles dans le panier: " + cart.length; // affichage du nombre d'articles et leurs prix

  /**ajout de la fonctionnalité suppression de la ligne lors du click sur le btn remove**/

  const removeBtn = document.getElementsByClassName("btnLine"); //ajout d'une class à la list de btn
  for (let j = 0; j < removeBtn.length; j++) {
    //pour chaque btn de list
    removeBtn[j].addEventListener("click", function () {
      cart.splice(j, 1); //supprime la ligne correspondante à l'index du btn
      localStorage.setItem("cart", JSON.stringify(cart)); //envoi les info du array cart au localstorage
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

const regexLettersOnly = /^[a-zA-Zàâéêèìîôùûçëäöüï-]+$/;
const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const regexCityAndAdress = /^[a-zA-Z0-9àâéêèìîôùûçëäöüï' _-]+$/;

let obj; //init de l'objet qui sera transformé en string avant envoi

let products; //init du array qui contiendra les id des différents produits du panier et qui sera ajout à la varibale obj avant transformation en string
const getObjetID = () => {
  //function pour récupérer tout les id produit array cart
  products = []; // creation du array contenant les ids
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i][3]); // ajout des id dans le array products
  }
};

// création de l'objet contact qui sera ajout à la variable obj avant transformation en string
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

const checkFormInput = () => {
  // vérification de tout les champs par étape et ajout des valeurs au key de contact
  if (regexLettersOnly.test(fName.value) == false) {
    //Regex prénom
    fName.style.backgroundColor = "#ffc0cb";
    alert("Veuillez informer votre prénom");
  } else {
    contact.firstName = fName.value;
    fName.style.backgroundColor = "#bcf5bc";

    if (regexLettersOnly.test(lName.value) == false) {
      //Regex nom
      lName.style.backgroundColor = "#ffc0cb";
      alert("Veuillez informer votre nom");
    } else {
      lName.style.backgroundColor = "#bcf5bc";
      contact.lastName = lName.value;

      if (regexCityAndAdress.test(adresse.value) == false) {
        //Regex adresse
        adresse.style.backgroundColor = "#ffc0cb";
        alert("Veuillez informer votre adresse");
      } else {
        adresse.style.backgroundColor = "#bcf5bc";
        contact.address = adresse.value;

        if (regexCityAndAdress.test(ville.value) == false) {
          //Regex ville
          ville.style.backgroundColor = "#ffc0cb";
          alert("Veuillez informer votre ville");
        } else {
          ville.style.backgroundColor = "#bcf5bc";
          contact.city = ville.value;

          if (regexEmail.test(mail.value) == false) {
            //Regex nom
            mail.style.backgroundColor = "#ffc0cb";
            alert("Veuillez informer votre adresse e-mail");
          } else {
            mail.style.backgroundColor = "#bcf5bc";
            contact.email = mail.value;

            // quand tous les champs du formulaire sont validés-->

            getObjetID(); // appel de la fonction pour récupéré les id des produits

            obj = { contact, products }; // ajout de contact et produits à l'objet obj.
            const toSend = JSON.stringify(obj); // transformation en string pour envoi JSON serveur

            // envoi des données au serveur
            const request = new XMLHttpRequest();

            request.onload = function () {
              if (this.readyState == XMLHttpRequest.DONE) {
                response = JSON.parse(this.responseText); // récupération de la reponse serveur
                let responseOrder;
                responseOrder = response.orderId; //l'order Id à afficher

                mainHtml.style.display = "none"; // ne plus afficher les elements tableau et formulaire
                const thanksCustomer = document.createElement("div"); // créer une DIV
                thanksCustomer.innerHTML =
                  "Merci pour votre commande " +
                  contact.firstName +
                  "<br>Commande numéro : " +
                  responseOrder +
                  "<br>Vous allez être redirigé vers la page d'accueil d'ici quelques secondes";

                // ajouter ce message à la div

                thanksCustomer.style.marginTop = "100px";
                thanksCustomer.style.fontSize = "20px";
                thanksCustomer.style.textAlign = "center";
                document.body.insertBefore(thanksCustomer,loadingSpinner); //Ajouter la div thanksCustomer avant loading spinner sur le body.
                loadingSpinner.style.display = "inline-block"; // ajout de l'animation loading
              }
            };

            request.open("POST", "http://localhost:3000/api/teddies/order");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(toSend); //envoi de l'objet contact / produits

            localStorage.clear(); // le panier redevient vide.

            setTimeout(() => {
              window.location.href = "index.html"; // renvoi vers la page d'accueil
            }, 5000);
          }
        }
      }
    }
  }
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  checkFormInput();
});
