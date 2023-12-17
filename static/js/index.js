import { loadEvents } from "./api.js";
import { addElementToDOM, fullDaynameToShortForm, backToRoot } from "./helpers.js"

function loadEightRandomEvents() {
    loadEvents((data) => {
        // Filter on events with images
        const eventsWithImages = data.filter(event => event.image !== null)

        // Generate 8 random events
        let events = [];
        for (let i = 0; i < 8; i++) {
            events.push(eventsWithImages[Math.floor(Math.random() * eventsWithImages.length)])
        }
        console.log(events);

        // Add events to the div
        const html = events.map((event, index) => {
            return `
            <a href="${backToRoot()}events/day.html?id=${event.id}" class="activity box ${index % 2 === 0 ? 'large' : 'small'}">
                <p class="date">${fullDaynameToShortForm(event.day_of_week)} ${event.day} juli</p>
                <img src="${event.image.full}">
                <div>
                    <h3 class="name">${event.title}</h3>
                    <p class="location">${event.location}</p>
                    <p class="time">${event.start} u.</p>
                </div>
            </a>
            `
        }).join('');
        
        addElementToDOM(html, '.featured-events__events')        

    })
}


function init() {
    loadEightRandomEvents()
}

init()