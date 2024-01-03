import { loadEvents, loadNews } from "../exports/api.js";
import { addElementToDOM, fullDaynameToShortForm, backToRoot } from "../exports/helpers.js"

function loadEightRandomEvents() {
    loadEvents((data) => {
        // Filter on events with images
        const eventsWithImages = data.filter(event => event.image !== null)

        // Generate 8 random events
        let events = [];
        for (let i = 0; i < 8; i++) {
            events.push(eventsWithImages[Math.floor(Math.random() * eventsWithImages.length)])
        }

        // Add events to the div
        const html = events.map((event, index) => {
            return `   
                <article class="activity box ${index % 2 === 0 ? 'small' : ''}">
                    <div class="image" style="background-image: url(${event.image.full});"></div>
                    <p class="date">${fullDaynameToShortForm(event.day_of_week)} ${event.day} juli</p>
                    <a href="${backToRoot()}events/detail.html?id=${event.id}" class="content">
                        <h3 class="name">${event.title}</h3>
                        <p class="location">${event.location}</p>
                        <p class="time">${event.start} u.</p>
                        <p class="price">${event.ticket === 'paid' ? '€' : ''}</p>
                    </a>
                </article>
            `
        }).join('');
        
        addElementToDOM(html, '.featured-events__events')        

    })
}

function loadLatestNewsItems() {
    loadNews((data) => {
        const latestThreeArticles = data.slice(0, 3)
        const html = latestThreeArticles.map(article => {
            return `
                <a href="${backToRoot()}news.html?id=${article.id}" class="btn black hover-red">
                    <H3>${article.title}</H3>
                    <div class="arrow right">
                        <svg class="arrow-right" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#000"></path></svg>
                    </div>
                </a>
            `
        }).join('');

        addElementToDOM(html, '.news__articles')
    })
}

function init() {
    loadEightRandomEvents()
    loadLatestNewsItems()
}

init()