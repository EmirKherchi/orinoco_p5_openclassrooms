/****** Variables du DOM******/

const numberEltCart = document.getElementById("number");
const table = document.getElementById("tableau");

const mainHtml = document.querySelector(".cart");
const loadingSpinner = document.querySelector(".lds-spinner");

/****** Récupération des elements dans le local Storage******/

const cart = JSON.parse(localStorage.getItem("cart"));

if (cart === null || cart.length < 1) {
  numberEltCart.innerHTML = "(0)";
  mainHtml.style.display = "none";
  const cartEmpty = document.createElement("div");
  cartEmpty.innerHTML =
    "<h1>Oups...</h1><br><h3>Votre panier est vide !<br>Retrouvez nos différents produits sur notre page d'accueil.</h3>";
  cartEmpty.style.marginTop = "250px";
  cartEmpty.style.lineHeight = "80px";
  cartEmpty.style.textAlign = "center";
  document.body.appendChild(cartEmpty);
} else {
  numberEltCart.innerHTML = "(" + cart.length + ")";

  /****** Création du tableau HTML pour chaque produits du panier******/

  for (let i = 0; i < cart.length; i++) {
    let newLigne = document.createElement("tr");
    table.appendChild(newLigne);
    newLigne.className += "tableLine";

    for (let j = 0; j < cart[i].length; j++) {
      let newCol = document.createElement("th");
      newLigne.appendChild(newCol);
      newCol.innerHTML = cart[i][j];
    }
  }

  /****** Ajout bouton supprimer et du prix total******/

  const line = document.getElementsByClassName("tableLine");

  let total = 0;
  const totalPrice = [];
  const totalCart = document.getElementById("prixTotal");

  for (i = 0; i < line.length; i++) {
    const allID = line[i].cells[3];
    allID.style.display = "none";

    const btn = document.createElement("button");
    btn.className += "btnLine";
    line[i].appendChild(btn);
    btn.innerHTML = "X";

    const allPrice = line[i].cells[2].textContent;
    totalPrice.push(parseFloat(allPrice));
  }

  for (let i = 0; i < totalPrice.length; i++) {
    total += totalPrice[i];
  }
  totalCart.innerHTML =
    total + " €" + "<br>Nombre d'articles dans le panier: " + cart.length;

  const removeBtn = document.getElementsByClassName("btnLine");

  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", function () {
      cart.splice(i, 1); //supprime la ligne correspondante à l'index du btn
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(true);
    });
  }
}

/****** Formulaire pour validation du panier******/

const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const adresse = document.getElementById("adress");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

const btnSubmitForm = document.getElementById("envoiDuPanier");

const regexLettersOnly = /^[a-zA-Zàâéêèìîôùûçëäöüï-]+$/;
const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const regexCityAndAdress = /^[a-zA-Z0-9àâéêèìîôùûçëäöüï' _-]+$/;

/****** Initialisation de l'Objet qui sera envoyé******/

let obj;
let products;

const getObjetID = () => {
  products = [];
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i][3]);
  }
};

let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

/****** fonction vérification formulaire******/

const modal = document.getElementById("modal");
const modalText = document.getElementById("modaltext");
const closeModal = document.getElementById("closemodal");

const modalAlert = (text) => {
  mainHtml.style.opacity = "0.2";
  modal.style.visibility = "visible";
  modalText.innerHTML = text;
  closeModal.addEventListener("click", function () {
    modal.style.visibility = "hidden";
    mainHtml.style.opacity = "1";
  });
};

const checkFormInput = () => {
  if (regexLettersOnly.test(fName.value) == false) {
    fName.style.backgroundColor = "#ffc0cb";
    modalAlert("Erreur dans le format de votre prénom");
  } else {
    contact.firstName = fName.value;
    fName.style.backgroundColor = "#bcf5bc";
    if (regexLettersOnly.test(lName.value) == false) {
      lName.style.backgroundColor = "#ffc0cb";
      modalAlert("Erreur dans le format de votre nom");
    } else {
      lName.style.backgroundColor = "#bcf5bc";
      contact.lastName = lName.value;
      if (regexCityAndAdress.test(adresse.value) == false) {
        adresse.style.backgroundColor = "#ffc0cb";
        modalAlert("Erreur dans le format de votre adresse");
      } else {
        adresse.style.backgroundColor = "#bcf5bc";
        contact.address = adresse.value;
        if (regexCityAndAdress.test(ville.value) == false) {
          ville.style.backgroundColor = "#ffc0cb";
          modalAlert("Erreur dans le format de votre ville");
        } else {
          ville.style.backgroundColor = "#bcf5bc";
          contact.city = ville.value;
          if (regexEmail.test(mail.value) == false) {
            mail.style.backgroundColor = "#ffc0cb";
            modalAlert("Erreur dans le format de votre adresse e-mail");
          } else {
            mail.style.backgroundColor = "#bcf5bc";
            contact.email = mail.value;

            // quand tous les champs du formulaire sont validés-->
            return true;
          }
        }
      }
    }
  }
};

const sendRequest = () => {
  getObjetID();

  obj = { contact, products }; // ajout de contact et produits à l'objet obj.
  const toSend = JSON.stringify(obj);

  // envoi des données au serveur
  const request = new XMLHttpRequest();

  request.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      response = JSON.parse(this.responseText);
      let responseOrder;
      responseOrder = response.orderId;

      mainHtml.style.display = "none";
      const thanksCustomer = document.createElement("div");
      thanksCustomer.innerHTML =
        "Merci pour votre commande " +
        contact.firstName +
        "<br>Commande numéro : " +
        responseOrder +
        "<br>Vous allez être redirigé vers la page d'accueil d'ici quelques secondes";

      thanksCustomer.style.marginTop = "100px";
      thanksCustomer.style.fontSize = "20px";
      thanksCustomer.style.textAlign = "center";
      document.body.insertBefore(thanksCustomer, loadingSpinner);
      loadingSpinner.style.display = "inline-block";
    }
  }

  request.open("POST", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(toSend);

  localStorage.clear();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
};

btnSubmitForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkFormInput()) {
    sendRequest();
  }
});
