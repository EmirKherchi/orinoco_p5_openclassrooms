

/**Vérification du nombre d'élément dans le panier et ajout de ce nombre dans le compteur de la nav bar**/

const cart = JSON.parse(localStorage.getItem("cart"));
const numberEltCart = document.getElementById("number");

if (cart === null || cart.length < 1) {
    numberEltCart.innerHTML = "(0)";
  } else {
    numberEltCart.innerHTML = "(" + cart.length + ")";
  }


  /******Fetch all products******/
const fetchPromise = fetch("http://localhost:3000/api/teddies/");

fetchPromise
  .then(function (response) {
    if (response.status !== 200) {
      console.log("erreur: " + response.status);
    }
    response.json().then(function (data) {
      localStorage.setItem("products", JSON.stringify(data));      
    });
  })
  .catch(function (error) {
    console.log(error + " erreur fetch");
  });