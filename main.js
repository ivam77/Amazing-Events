import { imprimirDatos, crearCheckbox, combinacionEventos, funcionEvento, remove, mostrarFavoritos, spanFavoritos } from "./module/funciones.js"; 

const elementoHtml = document.getElementById("cards");
const formSearch = document.getElementById("form-search");
const formCheckbox = document.getElementById("form-checkbox");
const $contenedor = document.getElementById("contenedor-favoritos")
const $span = document.getElementById("span-favoritos")
let events = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(response => response.json())
    .then(data => {
        events = data.events.filter(event => event.name)
        console.log("todos los eventos", events);

        imprimirDatos(events, elementoHtml);
        crearCheckbox(events, formCheckbox);

        formCheckbox.addEventListener('change', () => combinacionEventos(events, formSearch, elementoHtml));
        formSearch.addEventListener("keyup", () => combinacionEventos(events, formSearch, elementoHtml));

        elementoHtml.addEventListener("click", (event) =>{ 
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