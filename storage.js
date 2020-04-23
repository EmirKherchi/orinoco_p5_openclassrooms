import { response } from "express";

const js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'teddy_sale.js' ;

js.onreadystatechange = cart;
js.onload = cart;

//Ajout de la balise dans la page
document.body.appendChild(js);

//function prennant les éléments de la page teddy sale
function cart(){

    console

};

cart();
