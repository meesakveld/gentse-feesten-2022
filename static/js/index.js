import { loadEvents } from "./api.js";

function loadEightRandomEvents() {
    loadEvents((data) => {
        // Generate 8 random events
        let events = [];
        const random = Math.floor(Math.random() * data.length - 9);
        events = data.slice(random, random + 8)

        // Fetch the events tag
        const $eventsElement = document.querySelector('.featured-events__events')
        

    })
}


function init() {
    loadEightRandomEvents()
}

init()