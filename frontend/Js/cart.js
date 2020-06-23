/**********/
/****** Tableau dynamique******/
/**********/

/****** Récupération des elements dans le local Storage******/
const numberEltCart = document.getElementById("number");
const cart = JSON.parse(localStorage.getItem("cart"));
const mainElementPage = document.getElementById("mainBalise");

if (cart === null || cart.length < 1) {
  numberEltCart.innerHTML = "(0)";
  mainElementPage.style.display = "none";
  const cartEmpty = document.createElement("div");
  cartEmpty.classList.add("empty");
  cartEmpty.innerHTML = "<h1>Oups...</h1><br><h3>Votre panier est vide !<br>Retrouvez nos différents produits sur notre page d'accueil.</h3>";
  document.body.appendChild(cartEmpty);
} else {
  numberEltCart.innerHTML = "(" + cart.length + ")";

  /****** Création du tableau HTML pour chaque produits du panier******/

  const table = document.getElementById("tableau");
  for (let i = 0; i < cart.length; i++) {
    let newLigne = document.createElement("tr");
    table.appendChild(newLigne);
    newLigne.classList.add("tableLine");

    for (let j = 0; j < cart[i].length; j++) {
      let newCol = document.createElement("th");
      newLigne.appendChild(newCol);
      newCol.innerHTML = cart[i][j];
    }
  }

  /****** Ajout :  bouton supprimer / prix total ******/

  const line = document.getElementsByClassName("tableLine");

  let total = 0;
  const totalPrice = [];
  const totalCartSpan = document.getElementById("prixTotal");

  for (i = 0; i < line.length; i++) {
    //suppression des ID produits
    const allID = line[i].cells[3];
    allID.style.display = "none";

    //Création BTN supprimer
    const btn = document.createElement("button");
    btn.classList.add("btnLine");
    line[i].appendChild(btn);
    btn.innerHTML = "X";

    //récupération des prix
    const allPriceCells = line[i].cells[2].textContent;
    totalPrice.push(parseFloat(allPriceCells));
  }

  for (let i = 0; i < totalPrice.length; i++) {
    total += totalPrice[i];
  }
  totalCartSpan.innerHTML = total + " €" + "<br>Nombre d'articles dans le panier: " + cart.length;

  const removeBtn = document.getElementsByClassName("btnLine");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", function () {
      cart.splice(i, 1); //supprime la ligne correspondante à l'index du btn
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(true);
    });
  }
}


/**********/
/****** Formulaire de validation de commande******/
/**********/

/****** REGEX pour validation du panier******/

const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const adresse = document.getElementById("adress");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

const btnSubmitForm = document.getElementById("envoiDuPanier");
const loadingSpinner = document.querySelector(".lds-spinner");

const regexLettersOnly = /^[a-zA-Zàâéêèìîôùûçëäöüï-]+$/;
const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const regexCityAndAdress = /^[a-zA-Z0-9àâéêèìîôùûçëäöüï' _-]+$/;

/****** Initialisation de l'Objet qui sera envoyé******/

let objectToSend ;
let contact;
let productsId;
const getAllProductsID = () => {
  productsId = [];
  for (let i = 0; i < cart.length; i++) {
    productsId.push(cart[i][3]);
  }
};



/****** fonction vérification formulaire******/

const modal = document.getElementById("modal");
const modalText = document.getElementById("modaltext");
const closeModal = document.getElementById("closemodal");

const modalAlert = (text) => {
  mainElementPage.style.opacity = "0.2";
  modal.style.display = "block";
  modalText.innerHTML = "Erreur dans le format de votre " + text;
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    mainElementPage.style.opacity = "1";
  });
};

const checkFormInput = () => {
  if (regexLettersOnly.test(fName.value) == false) {
    fName.className = "form-control alert alert-danger";
    modalAlert("prénom");
  } else {
    fName.className = "form-control alert alert-success";
    if (regexLettersOnly.test(lName.value) == false) {
      lName.className = "form-control alert alert-danger";
      modalAlert("nom");
    } else {
      lName.className = "form-control alert alert-success";
      if (regexCityAndAdress.test(adresse.value) == false) {
        adresse.className = "form-control alert alert-danger";
        modalAlert("adresse");
      } else {
        adresse.className = "form-control alert alert-success";
        if (regexCityAndAdress.test(ville.value) == false) {
          ville.className = "form-control alert alert-danger";
          modalAlert("ville");
        } else {
          ville.className = "form-control alert alert-success";
          if (regexEmail.test(mail.value) == false) {
            mail.className = "form-control alert alert-danger";
            modalAlert("adresse e-mail");
          } else {
            mail.className = "form-control alert alert-success";    
            return true;
          };
        };
      };
    };
  };
};

/* Fonction envoi des données */

const sendRequest = () => {
  
  //création de l'objet
  contact = {
    firstName: fName.value,
    lastName: lName.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  getAllProductsID();
  objectToSend = { contact, products : productsId }; 
  const ObjectSend = JSON.stringify(objectToSend);


  // envoi de l'objet et traitement de la réponse
  const request = new XMLHttpRequest();
  request.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      response = JSON.parse(this.responseText);
      let responseOrder;
      responseOrder = response.orderId;

      mainElementPage.style.display = "none";
      const thanksCustomer = document.createElement("div");
      thanksCustomer.classList.add("thanks");
      thanksCustomer.innerHTML = "Merci pour votre commande " + contact.firstName + "<br>Commande numéro : " + responseOrder + "<br>Vous allez être redirigé vers la page d'accueil d'ici quelques secondes";
      document.body.insertBefore(thanksCustomer, loadingSpinner);
      loadingSpinner.style.display = "block";
    }
  };
  request.open("POST", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(ObjectSend);

  localStorage.removeItem("cart");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
};

//Evenement sur le bouton validation du formulaire
btnSubmitForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkFormInput()) {
    sendRequest();
  }
});
