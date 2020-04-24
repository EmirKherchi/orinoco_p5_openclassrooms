const numberEltCart = document.getElementById("number");

let table = document.getElementById("tableau");
let newLigne = document.createElement("tr");
let newCol;

const cart = JSON.parse(localStorage.getItem("cart"));
numberEltCart.innerHTML = "(" + cart.length + ")"; //ajout du nombre d'élément dans le compteur dans la navbar
//console.log(cart.length);






for (let i = 0; i < cart.length; i++) {
  let newLigne = document.createElement("tr"); //créer une nouvelle ligne
  table.appendChild(newLigne);//ajoute la ligne au tableau
  newLigne.className += "tableLine"; //donne la class tableLigne à ts les elements newligne

  for (j = 0; j < cart[i].length; j++) {
    newCol = document.createElement("th");//créer une nouvelle colonne;
    newLigne.appendChild(newCol);//ajoute la colone à la ligne créer précedement
    newCol.innerHTML = cart[i][j];// ajoute les information  du array produit dans le array cart aux colonnes
  }
}




const line = document.getElementsByClassName("tableLine");//pointe toutes les nouvelles lignes

for (i = 0; i < line.length; i++) {
  let btn = document.createElement("button"); //créer un bouton par nombre de ligne
  btn.className += "btnLine";//donne leur la classe btnLine
  line[i].appendChild(btn);//pour chaque ligne donne un btn nouvellement créer
  btn.innerHTML = "X";
}







const removeBtn = document.getElementsByClassName("btnLine");

for (var i = cart.length-1; i >= 0; i--) {
  removeBtn[i].addEventListener("click", function () {
      console.log(removeBtn);
    cart.splice(i);

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(true);
  });
}


