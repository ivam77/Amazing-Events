export function cargarDatos(event) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.find(fav => fav._id == event._id);

    const div = document.createElement("DIV");
    div.classList = `card`;

    const button = document.createElement("button");
    button.classList = `star ${favoritos ? 'starSelected' : ''}`;
    button.style.height = "32px";
    button.style.width = "32px";
    button.setAttribute("data-id", event._id);
    div.appendChild(button);

    div.innerHTML += `
    <div class="img" style="background-image: url(${event.image})"></div>
    <div class="card-body">
    <h5 class="card-title border-bottom pb-2 fw-bold">${event.name}</h5>
    <h6 class="card-title text-primary category">${event.category}</h6>
    <p class="card-text  ">${event.description}</p>
    <p class="fw-bold m-0">${event.assistance ?
            `Assistance:  <span class="fw-normal">${event.assistance} pers.</span>` :
            `Estimated: <span class="fw-normal">${event.estimate} pers.</span>`}
    </p>
    <p class=" fw-bold m-0">Place: <span class="fw-normal">${event.place}</span></p>
    <p class="price-title" >U$S: ${event.price}</p>            
    <h6 class=" date mt-2 text-primary"><img class="h-75" src="./assets/images/date.png"  alt="..."> ${event.date}</h6>
    
    <div class="d-flex mt-3 gap-3">
    <a id="btn-goSomewhere" href="./details.html?id=${event._id}" class="btn btn-primary">Details</a>
    <a id="btn-goSomewhere" href="./TICKETS.html?id=${event._id}" class="btn btn-primary">Buy tickets</a>
    </div>
    </div>
    `;

    return div;
}

export function imprimirDatos(events, elementoHtml) {
    elementoHtml.innerHTML = ""
    let fragment = document.createDocumentFragment();

    events.forEach(event => fragment.appendChild(cargarDatos(event)));
    elementoHtml.appendChild(fragment);
}

//---------------favoritos
export function funcionEvento(event, favoritos, events) {
    if (event.target.localName === "button") {
        event.target.classList.toggle("starSelected", !event.target.classList.contains("starSelected"));

        const bool = favoritos.some(eventos => eventos._id == event.target.dataset.id)

        if (bool) {
            const indexToRemove = favoritos.findIndex(evento => evento._id == event.target.dataset.id);
            if (indexToRemove !== -1) {
                favoritos.splice(indexToRemove, 1);
                toast(false, events[indexToRemove]);
            }
        } else {
            const aux = events.find(eventos => eventos._id == event.target.dataset.id);
            favoritos.push(aux);
            toast(true, aux);
        }
        console.log("favoritos", favoritos);

        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Actualiza la vista de favoritos
        mostrarFavoritos(favoritos);

    }
}

export function remove(event, favoritos) {
    if (event.target.localName === "a") {
        // Busca el botón asociado a este evento en favoritos
        const botonFavorito = document.querySelector(`button[data-id="${event.target.dataset.id}"]`);
        if (botonFavorito) {
            botonFavorito.classList.remove("starSelected");
        }
        
        const eventoEliminado = favoritos.find(evento => evento._id == event.target.dataset.id);

        if (eventoEliminado) {
            const indice = favoritos.indexOf(eventoEliminado);
            if (indice !== -1) {
                favoritos.splice(indice, 1);
            }
        }
        console.log("favoritos", favoritos);

        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Actualiza la vista de favoritos sin recargar la página
        mostrarFavoritos(favoritos);

    }
}

export function mostrarFavoritos(favoritos) {
    const $contenedor = document.getElementById("contenedor-favoritos");
    $contenedor.innerHTML = ""; 

    favoritos.forEach((favorito) => {
        const div = document.createElement("div");
        div.classList.add("card", "w-100");

        div.innerHTML = `
        <div class="card-body">
            <h5 class="card-title category border-bottom pb-2">
            ${favorito.name}
            </h5>
            <h6 class="card-text">${favorito.category}</h6>
            <p class="card-text mb-2 fst-italic small text-light">
            ${favorito.description}
            </p>
            <h6 class="card-text date mb-3">
            <img
                class="h-75 me-2"
                src="./assets/images/date2.png"
                alt="..."
            /> ${favorito.date}
            </h6>
            <div class="d-flex gap-2">
            <a
                href="./details.html?id=${favorito._id}"
                class="btn btn-primary btn-sm text-light"
                >Details</a
            >
            <a
                href="./TICKETS.html?id=${favorito._id}"
                class="btn btn-primary btn-sm text-light"
                >Buy tickets</a
            >
            <a href="#" 
            class="btn btn-primary btn-sm"
            data-id="${favorito._id}" 
            >Remove</a>
            </div>
        </div>
        `;

        // Agrega el favorito al contenedor
        $contenedor.appendChild(div);
    });
}

export function spanFavoritos(spanElement, favoritos) {
    if (favoritos.length > 0) {
        spanElement.innerHTML = favoritos.length.toString();
    } else {
        spanElement.innerHTML = "0"; 
    }

}

export function toast(isAdd, objectSelected) {
    const $toastContainer = document.getElementById("contenedor-toast");

    // Creamos un elemento de toast
    const toastElement = document.createElement("div");
    toastElement.classList.add("toast");
    toastElement.setAttribute("role", "alert");
    toastElement.setAttribute("aria-live", "assertive");
    toastElement.setAttribute("aria-atomic", "true");

    // Contenido del toast
    toastElement.innerHTML = `
        <div class="toast-header">
            <i class="${isAdd ? 'bi bi-star-fill px-2 text-warning' : 'bi bi-star px-2 text-dark'}"></i>
            <strong class="me-auto">${isAdd ? objectSelected.name + ' added' : objectSelected.name + ' removed'}</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${isAdd ? "The event has been added to favorites" : "The event has been removed from favorites"}
        </div>
    `;

    // Agregamos el toast al contenedor
    $toastContainer.appendChild(toastElement);

    // Mostramos el toast
    const toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();
}


//----------Checkbox y search
//TODO: Funcion para crear los checkboxes con elemento de iconos
//TODO: dinamicamente--Con Nodos....
const categoryIcons = {
    Food: "bi bi-cup-hot",
    Museum: "bi bi-bank",
    Concert: "bi bi-music-note-beamed",
    Race: "bi bi-car-front-fill",
    Books: "bi bi-journal-bookmark",
    Cinema: "bi bi-film",
    Party: "bi bi-balloon",
};

export function crearCheckbox(events, elementoHtml) {
    const categories = [...(new Set(events.map((event) => event.category)))]

    for (let category of categories) {
        const div = document.createElement("div");
        div.classList.add("check");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "form-check-input";
        input.value = category;
        input.id = `${category}-check`;
        input.name = "category";
        input.style.cursor = "pointer";

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `${category}-check`);
        label.style.cursor = "pointer";

        // Crea un elemento de icono
        const icon = document.createElement("i");
        icon.className = categoryIcons[category];
        icon.style.marginRight = ".5rem";

        label.appendChild(icon);
        label.appendChild(document.createTextNode(category));

        div.appendChild(input);
        div.appendChild(label);

        elementoHtml.appendChild(div);
    }
};

export function combinacionEventos(events, formSearch, elementoHtml) {
    const checkbox = [...document.querySelectorAll(`input[type=checkbox]:checked`)].map((check) => check.value);

    const cartasFiltradas = events.filter(event => {
        return checkbox.includes(event.category) || checkbox.length === 0;
    }).filter(event => {
        return event.name.toLowerCase().indexOf(formSearch.value.toLowerCase()) === 0;
    });

    const noCoincidencias = document.getElementById("noCoincidencias");

    if (cartasFiltradas.length === 0) {
        elementoHtml.innerHTML = "";
        noCoincidencias.style.display = "block";
    } else {
        imprimirDatos(cartasFiltradas, elementoHtml);
        noCoincidencias.style.display = "none";
    }
};

//-----------------Stats
export function myApp(eventsPast, eventsUp) {
    let tbodyPast = document.getElementById("tbodyPast");
    let tbodyUp = document.getElementById("tbodyUp");
    let mayorAsistencia = document.getElementById("mayorAsistencia");
    let menorAsistencia = document.getElementById("menorAsistencia");
    let mayorCapacidad = document.getElementById("mayorCapacidad");

    const categoryStatsUp = {};
    const categoryStatsPast = {};

    function fillTables(arrayEvents, table) {

        let categoryStats = table === "past" ? categoryStatsPast : categoryStatsUp

        for (let i = 0; i < arrayEvents.length; i++) {
            const event = arrayEvents[i]//en la posicion en la que esta, en cada objeto
            const category = event.category
            const assistanceOrEstimate = table === "past" ? event.assistance : event.estimate
            const price = event.price
            const capacity = event.capacity

            const priceCalculate = assistanceOrEstimate * price

            if (categoryStats[category]) {
                console.log("ya existe")
                categoryStats[category].assistanceOrEstimate += assistanceOrEstimate
                categoryStats[category].capacity += capacity
                categoryStats[category].priceCalculate += priceCalculate
            } else {
                console.log("crear")
                categoryStats[category] = {
                    category, // etan todas las suma
                    assistanceOrEstimate,
                    capacity,
                    priceCalculate
                };
            }

            for (const category in categoryStats) {
                const assistanceOrEstimate = categoryStats[category].assistanceOrEstimate
                const capacity = categoryStats[category].capacity

                const percentCapacity = (assistanceOrEstimate / capacity) * 100

                categoryStats[category].percentCapacity = percentCapacity
            }
        }
    }

    function updateView(object) {
        return `<tr>
        <td>${object.category}</td>
        <td>$${object.priceCalculate.toLocaleString()}</td>
        <td>${object.percentCapacity.toFixed(2)}%</td>
    </tr>`
    }

    function inprentDates(eventsPast, table) {
        let template = ""
        for (let datos of eventsPast) {
            template += updateView(datos)
        }
        table.innerHTML = template
    }


    function eventoConMayorAsistencia(data) {
        let maxAsistencia = 0;
        let eventoConMayorAsistencia;

        data.forEach((evento) => {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

            if (porcentajeAsistencia > maxAsistencia) {
                maxAsistencia = porcentajeAsistencia;
                eventoConMayorAsistencia = evento;
            }
        });

        mayorAsistencia.innerHTML =
            eventoConMayorAsistencia.name + " " + maxAsistencia.toFixed(2) + " %";
    }

    function eventoConMenorAsistencia(data) {
        let minAsistencia = Infinity;
        let eventoConMenorAsistencia;

        data.forEach((evento) => {
            const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

            if (porcentajeAsistencia < minAsistencia) {
                minAsistencia = porcentajeAsistencia;
                eventoConMenorAsistencia = evento;
            }
        });

        menorAsistencia.innerHTML =
            eventoConMenorAsistencia.name + " " + minAsistencia + " %";
    }

    function eventoConMayorCapacidad(data) {
        let maxCapacidad = 0;
        let eventoConMayorCapacidad = null;

        data.forEach((evento) => {
            const porcentajeCapacidad = evento.capacity;

            if (porcentajeCapacidad > maxCapacidad) {
                maxCapacidad = porcentajeCapacidad;
                eventoConMayorCapacidad = evento;
            }
        });

        mayorCapacidad.innerHTML = eventoConMayorCapacidad.name + " " + maxCapacidad;
    }

    fillTables(eventsPast, "past");
    inprentDates(Object.values(categoryStatsPast), tbodyPast);

    fillTables(eventsUp, "up");
    inprentDates(Object.values(categoryStatsUp), tbodyUp);

    eventoConMayorAsistencia(eventsPast);
    eventoConMenorAsistencia(eventsPast);
    eventoConMayorCapacidad(eventsPast);
};