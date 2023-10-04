import {imprimirDatos, crearCheckbox, combinacionEventos, funcionEvento, remove, mostrarFavoritos, spanFavoritos} from "./module/funciones.js"

const elementoHTMLup = document.getElementById("cards2")
const formSearch = document.getElementById("form-search")
const formCheckbox = document.getElementById("form-checkbox")
const $contenedor = document.getElementById("contenedor-favoritos")
const $span = document.getElementById("span-favoritos")
let events = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let currentDate;
let eventsUp;

//metodo de wind.. es una api del navegador
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(Response => Response.json())
    .then(data => {
        currentDate = data.currentDate 
        events = data.events 
        eventsUp = events.filter( event => event.date > currentDate)
        console.log(eventsUp)

        imprimirDatos(eventsUp, elementoHTMLup);
        crearCheckbox(eventsUp, formCheckbox);

        formCheckbox.addEventListener('change', () => combinacionEventos(eventsUp, formSearch, elementoHTMLup));
        formSearch.addEventListener("keyup", () => combinacionEventos(eventsUp, formSearch, elementoHTMLup));
        
        elementoHTMLup.addEventListener("click", (event) =>{ 
            funcionEvento(event, favoritos, events)
            spanFavoritos($span, favoritos);
        });

        $contenedor.addEventListener("click", (event) =>{
            remove(event, favoritos)
            spanFavoritos($span, favoritos);
        });
        
        mostrarFavoritos(favoritos);
        spanFavoritos($span, favoritos);

    }).catch(err => console.log(err))