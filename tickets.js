const elementoHtmlTicket = document.getElementById("tickets");

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

        elementoHtmlTicket.innerHTML = `
        <div class="contenedor-general w-100 ">
        <div class="linea-ticket"></div>
        <div class="cont-ticket d-flex justify-content-around w-100 ">
            <img
            src="${eventoEncontrado.image}"
            alt="img1"
            class="img-ticket"
            />
            <article class=" w-50">
            <h2 class="title-h2 ">${eventoEncontrado.name}</h2>
            <p class="p2-ticket ">${eventoEncontrado.category}</p>
            <p class="p-ticket ">Place: ${eventoEncontrado.place}</p>
            <p class="p-ticket ">Capacity: ${eventoEncontrado.capacity} pers.</p>
            <p class="p-ticket "> <samp class="price-ticket ">Price:</samp> $${eventoEncontrado.price}</p>
            </article>
        </div>

        <div class="contenedor-form d-flex flex-column align-items-center">
        <form class="form-ticket d-flex flex-column align-items-center">
        <h2 class="h2-ticket">Buy your tickets</h2>
            <div>
                <legend class="title-ticket">Type:</legend>
                <select class="select-ticket" id="event" name="event">
                <option value="10.00">general admission - $${eventoEncontrado.price}</option>
                <option value="20.00">field - $20</option>
                <option value="30.00">middle field - $30</option>
                <option value="40.00">front field- $40</option>
                </select>
                <br />
                <legend class="title-ticket">Amount:</legend>
                <label for="cantidad"></label>
                <input
                type="number"
                id="cantidad"
                name="cantidad"
                min="1"
                value="1"
                class="input-ticket"
              />
              <br />
              <p class="total-p">Total to pay: <span id="total">$${eventoEncontrado.price}</span></p>
            </div>
            <input class="submit" type="submit" value="Make a purchase" />
          </form>

          <div class="contenedor-descrip">
          <h4>description:</h4>
          <p class="p-descrip">${eventoEncontrado.description}</p>
        </div>
      </div>
        </div>
        `;

    }).catch(err => console.log(err))