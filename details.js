const elementoHTMDetail = document.getElementById("detail");

//TODO: Creo una nueva URL con el key=value..
const params = new URLSearchParams(location.search);

const nombre = params.get(`id`);
console.log(nombre); //TODO: para buscar el valor de la key..

let events;

//metodo de wind.. es una api del navegador
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(Response => Response.json())
    .then(data => {
        events = data.events

        let eventoEncontrado = data.events.find(events => events._id == nombre);
        console.log(eventoEncontrado);

        elementoHTMDetail.innerHTML = `
<div class="d-flex conteiner">
    <img class="img-da" src="${eventoEncontrado.image}" alt="img">
    <article class="article-datails">
        <h2 class="h2-datails">${eventoEncontrado.name}</h2>
        <ul class="ul-datails" >
            <li> <samp class="texto-details">id:</samp> ${eventoEncontrado._id}</li>
            <li> <samp class="texto-details">name:</samp> ${eventoEncontrado.name}</li>
            <li> <samp class="texto-details">date:</samp> ${eventoEncontrado.date}</li>
            <li> <samp class="texto-details">capacity:</samp> ${eventoEncontrado.capacity}</li>
            <li> <samp class="texto-details">description:</samp>${eventoEncontrado.description}</li>
            <li> <samp class="texto-details">category:</samp> ${eventoEncontrado.category}</li>
            <li> <samp class="texto-details">assistance:</samp>${eventoEncontrado.assistance}</li>
            <li> <samp class="texto-details">place:</samp> ${eventoEncontrado.place}</li>
            <li> <samp class="texto-details">price:</samp> ${eventoEncontrado.price}</li>
        </ul>
    </article>
</div>`;

    }).catch(err => console.log(err))