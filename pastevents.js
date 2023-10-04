import {imprimirDatos, crearCheckbox, combinacionEventos, funcionEvento, remove, mostrarFavoritos, spanFavoritos} from "./module/funciones.js"

const  elementoHtml = document.getElementById("cards3")
const formSearch = document.getElementById("form-search")
const formCheckbox = document.getElementById("form-checkbox")
const $contenedor = document.getElementById("contenedor-favoritos")
const $span = document.getElementById("span-favoritos")
let events = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let currentDate;
let eventsPast;


//metodo de wind.. es una api del navegador
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(Response => Response.json())
    .then(data => {
        currentDate = data.currentDate
        events = data.events
        eventsPast = events.filter( event => event.date < currentDate)

        imprimirDatos(eventsPast,  elementoHtml);
        crearCheckbox(eventsPast, formCheckbox);

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


// function cargarDatos(objeto) {
//     const div = document.createElement("DIV")
//     div.classList = `card`
//     div.innerHTML = `
//             <div class="img" style="background-image: url(${objeto.image})"></div>
//             <div class="card-body">
//             <h5 class="card-title">${objeto.name}</h5>
//             <p class="card-text">${objeto.description}</p>
//             <div class="d-flex justify-content-between ">
//             <p class="text-center" >Price $${objeto.price}</p>
//             <a href="./DETAILS.html?id=${objeto._id}" class="btn btn-primary">Details</a>
//                 </div>
//             </div>
//             `
//     return div
// }


// function imprimirDatos(eventsPast, elementoHTMPast) {
//     elementoHTMPast.innerHTML = ""
//     let fragment = document.createDocumentFragment()
//     eventsPast.forEach(objeto => fragment.appendChild(cargarDatos(objeto)))
//     elementoHTMPast.appendChild(fragment)
// }


// // //!------------------------------------------------------------------------!!

// //* Funcion para crear los checkboxes dinamicamente--Con Nodos....
// function crearCheckbox() {
//     const categories = Array.from(new Set(eventsPast.map((event) => event.category)));

//     for (let category of categories) {
//         const div = document.createElement("div");
//         div.classList.add("check");

//         const input = document.createElement("input");
//         input.type = "checkbox";
//         input.className = "form-check-input";
//         input.value = category;
//         input.id = `${category}-check`;
//         input.name = "category";
//         input.style.cursor = "pointer";

//         const label = document.createElement("label");
//         label.className = "form-check-label";
//         label.setAttribute("for", `${category}-check`);
//         label.textContent = category;
//         label.style.cursor = "pointer";

//         div.appendChild(input);
//         div.appendChild(label);

//         formCheckbox.appendChild(div);
//     }
// }


// function combinacionEventos() {
//     const checkbox = [...document.querySelectorAll(`input[type=checkbox]:checked`)].map((check) => check.value);

//     const cartasFiltradas = eventsPast.filter(event => {
//         return checkbox.includes(event.category) || checkbox.length === 0;
//     }).filter(event => {
//         return event.name.toLowerCase().indexOf(formSearch.value.toLowerCase()) === 0;
//     });

//     imprimirDatos(cartasFiltradas, elementoHTMPast);
// }






















