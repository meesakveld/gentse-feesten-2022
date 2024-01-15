import { loadEvents } from "../exports/api.js";
import { addElementToDOM, backToRoot, getSearchParamsFromURL, stringToLowercaseSnakeCase } from "../exports/helpers.js"
import { generateHTMLForActivity, generateHTMLForCalendarView } from "../exports/components.js";




function loadCalendarView(event) {
    const html = generateHTMLForCalendarView(event.day)
    addElementToDOM(html, '.calendar-view')
}

function generateHTMLForDetail(ev) {
    return `
        <div class="go-back">
            <a class="back arrow" href="${backToRoot()}events/day.html?day=${ev.day}">
                <svg class="arrow-left" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#fff"></path></svg>
                <p>Overzicht ${ev.day_of_week} ${ev.day} juli</p>
            </a>
        </div>

        <div class="detail__top">
            <div class="biography">
                <h2>${ev.title}</h2>
                <div class="when">
                    <p class="location">${ev.location}</p>
                    <p class="time">${ev.start} u. - ${ev.end} u.</p>
                </div>
                <p class="description">${ev.description}</p>
            </div>
            <div class="image">
                <img src="${ev.image ? ev.image.full : `${backToRoot() + "static/img/logos/campagne-1-G.png"}`}" alt="${ev.title}">
            </div>
        </div>

        <div class="detail__middle">
            <div class="organiser">
                <p class="title">Organisator:</p>
                <a class="text" href="">${ev.organizer}</a>
            </div>
            
            ${ ev.url ? `
            <div class="website">
                <p class="title">Website:</p>
                <a class="text" target="_blank" href="${ev.url}">${ev.url}</a>
            </div>
            ` : '' }

            <div class="category">
                <p class="title">Categorieën:</p>
                <div>
                    ${
                        ev.category.map(category => {
                            return `<a class="text" href="day.html?day=${ev.day}#${stringToLowercaseSnakeCase(category)}">${category}</a>`
                        }).join('')
                    }
                </div>
            </div>
            ${ ev.wheelchair_accessible === true ?
                '<img src="../static/img/icons/wheelchair.svg" alt="wheelchair accessible icon">'                
            : ''}

        </div>

        <div class="detail__bottom">
            <div class="top">
                <p class="location">${ev.location}</p>
                <p>9000 Represent</p>
                <a class="link" href="#">Open in Google Maps</a>
            </div>
            <div class="bottom">
                <img src="../static/img/images/google-maps.png" alt="Google Maps">
            </div>
        </div>
    `
}

async function getEventFromURL() {
    const slug = getSearchParamsFromURL('slug');
    const day = getSearchParamsFromURL('day');
    
    await loadEvents((data) => {
        // Event that matches the slug from the URL
        const filteredEvent = data.filter(event => event.slug === slug).find(event => event.day === day)
        if (!filteredEvent) window.open(`${backToRoot()}events/day.html`, '_self')
        
        // Calendar view
        loadCalendarView(filteredEvent);

        // Detail view
        addElementToDOM(generateHTMLForDetail(filteredEvent), '.detail__container')

        // Load events based on same location
        addElementToDOM(generateHTMLForActivity(data.filter(event => event.location === filteredEvent.location), 'box', true), '.more-location-events')

        // Load events based on same orginizer
        addElementToDOM(generateHTMLForActivity(data.filter(event => event.organizer === filteredEvent.organizer), 'list', true), '.more-organiser-events')
    })
}

async function init() {
    try {
        await getEventFromURL()
    } catch (error) {
        console.log(error)
    }
}

init()