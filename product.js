//Déclaration des variables

const title = document.getElementById("title");
const img = document.getElementById("image");
const description = document.getElementById("description");
const price = document.getElementById("price");

//dropdown menu dynamique
let menu = document.getElementById('choose-color')



//variable elements de navigation

const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");

//fetch, apel de l'api

fetch("http://localhost:3000/api/teddies")
.then(function (response) {
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
        title.innerHTML = this.name;
        img.src = this.image;
        img.style.display = "block";
        description.innerHTML = this.description;
        price.innerHTML = (this.price / 100).toFixed(2) + " €"; //divisé par 100, en gardant deux chiffres après la virgule
        
        
        
        let dropdown = document.createElement('select'); //création du menu de selection
let defaultOption = document.createElement('option');//creation des option du dropdown menu
defaultOption.text = 'Personalisez votre ourson';
dropdown.add(defaultOption); // ajout du texte par défaut
dropdown.selectedIndex = 0;
dropdown.length = 0;  
        
        menu.prepend(dropdown);// ajout du dropdown à la div parent "choose-color".
        
        
        for (let i = 0; i < this.colors.length; i++) {
          option = document.createElement('option');
      	  option.innerHTML = this.colors[i];
      	  dropdown.add(option);
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

    // mise en place des evenements avec appel de la fonction teddys.
    one.addEventListener("click", function () {
      norbert.teddys();
    });
    two.addEventListener("click", function () {
      arnold.teddys();
    });
    three.addEventListener("click", function () {
      lennyAndCarl.teddys();
    });
    four.addEventListener("click", function () {
      gustav.teddys();
    });
    five.addEventListener("click", function () {
      garfunkel.teddys();
    });
  });
});
