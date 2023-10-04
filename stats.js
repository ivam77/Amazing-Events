import {myApp} from "./module/funciones.js"

let currentDate;
let events;
let eventsUp;
let eventsPast;

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(Response => Response.json())
    .then(data => {
        currentDate = new Date(data.currentDate)
        events = data.events

        eventsUp = events.filter(element => (new Date(element.date) > currentDate))

        eventsPast = events.filter(element => (new Date(element.date) < currentDate))

        myApp(eventsPast, eventsUp)

    }).catch(err => console.log(err))