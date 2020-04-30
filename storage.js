const numberEltCart = document.getElementById("number");
const totalCart = document.getElementById("prixTotal");
let table = document.getElementById("tableau");
let newLigne = document.createElement("tr");
let newCol;
let total = 0; //init d'un variable qui récupèrera la somme du tableau des prix

/*****************/
const cart = JSON.parse(localStorage.getItem("cart")); //récupération des elements dans le local storage
numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur dans la navbar
/*************/
console.log("voici les product présents dans le panier " + cart);

/**Creation du tableau**/
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

/**ajout de la fonctionnalité suppression de la ligne lors du clock sur le btn remove**/
const removeBtn = document.getElementsByClassName("btnLine"); //ajout d'un class à la list de btn
for (let j = 0; j < removeBtn.length; j++) {
  //pour chaque btn de list
  removeBtn[j].addEventListener("click", function () {
    cart.splice(j, 1); //supprime la ligne correspondante à l'index du btn
    localStorage.setItem("cart", JSON.stringify(cart)); //envoi les info du cart au localstorage
    location.reload(true); //rafraichi la page
  });
}

/***Elements form***/

const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const adress = document.getElementById("adress");
const city = document.getElementById("city");
const email = document.getElementById("email");
const btnSubmit = document.getElementById("envoiDuPanier");

// let contact={
//   firstName: "" ,
//   Name: "",
//   adresse: "",
//   city: "",
//   email: "",
// }
const idProduit = [];
let objet;


function getobjetID() {
  for (let i = 0; i < cart.length; i++) {
    idProduit.push(cart[i][3]);
  }
}

envoiDuPanier.addEventListener("click", function (e) {
  e.preventDefault();
  getobjetID();
  const contact = {
    firstName: firstName.value,
    Name: lastName.value,
    adresse: adress.value,
    city: city.value,
    email: email.value,
  };
  objet = {
    contact,
    idProduit,
  };
  console.log(objet);
});

// envoiDonnees = (objetRequest) => {
//   return new Promise((resolve)=>{
//     let request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//       if(this.readyState == XMLHttpRequest.DONE && this.status == 201)
//       {
//         //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html
//         sessionStorage.setItem("order", this.responseText);

//         //Chargement de la page de confirmation
//         // document.forms["form-panier"].action = './order-confirm.html';
//         // document.forms["form-panier"].submit();

//         resolve(JSON.parse(this.responseText));
//     }
// };
// request.open("POST", "http://localhost:3000/api/teddies/order");
// request.setRequestHeader("Content-Type", "application/json");
// request.send(objetRequest);
// });
// };

// const sendCart = async function(data){
//   let response = await fetch('http://localhost:3000/api/teddies/order', {
//     method: 'POST',
//     hearders:{
//       'Content-type': 'application/json' //je t'envoi du json
//     },
//     body: JSON.stringify(data)
//   })
// }
