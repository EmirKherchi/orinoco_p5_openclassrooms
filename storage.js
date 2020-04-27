const numberEltCart = document.getElementById("number");
const totalCart = document.getElementById("prixTotal");
let table = document.getElementById("tableau");
let newLigne = document.createElement("tr");
let newCol;
let total = 0; //init d'un variable qui récupèrera la somme du tableau des prix 


/*****************/
const cart = JSON.parse(localStorage.getItem("cart"));//récupération des elements dans le local storage
numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur dans la navbar
/*************/


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


/**creation d'un button remove et récupération des prix totaux**/
const line = document.getElementsByClassName("tableLine"); //pointe toutes les nouvelles lignes
const totalPrice=[]//tableau vide pour ajout des prix par article

for (i = 0; i < line.length; i++) {
  const btn = document.createElement("button"); //créer un bouton par nombre de ligne
  btn.className += "btnLine"; //donne leur la classe btnLine
  line[i].appendChild(btn); //pour chaque ligne donne un btn nouvellement créer
  btn.innerHTML = "X";

  const allPrice = line[i].cells[2].textContent;//récupération des cellules contenant le prix de chaque article
  totalPrice.push(parseFloat(allPrice));// ajout des prix au tableau pour le total
}
for(let i = 0; i < totalPrice.length; i++){
  total += totalPrice[i];//ajout de la somme des prix du array à total
}
totalCart.innerHTML=total +" €";



/**ajout de la fonctionnalité suppression de la ligne lors du clock sur le btn remove**/
const removeBtn = document.getElementsByClassName("btnLine"); //ajout d'un class à la list de btn
for (let j = 0; j < removeBtn.length; j++) { //pour chaque btn de list
  removeBtn[j].addEventListener("click", function () {
    cart.splice(j, 1);//supprime la ligne correspondante à l'index du btn
    localStorage.setItem("cart", JSON.stringify(cart)); //envoi les info du cart au localstorage
    location.reload(true); //rafraichi la page
  });
}

