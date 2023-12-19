import { loadEvents } from "./api.js";
import { addElementToDOM, fullDaynameToShortForm, backToRoot } from "./helpers.js"

function getViewOption() {
    const viewStatus = document.querySelector('.active')
    const activeView = viewStatus.classList
    return activeView[0]
}

function loadEventResults(searchText) {
    loadEvents((data) => {
        const filteredEvents = data.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));

        const htmlEvents = filteredEvents.map((event, index) => {
            return `
                <article class="activity date ${getViewOption()} ${index % 2 === 0 ? 'small' : ''}">
                    <div class="image" style="background-image: url(${event.image !== null ? event.image.full : `${backToRoot()}static/img/logos/campagne-1-G.png`});"></div>
                    <p class="date">${fullDaynameToShortForm(event.day_of_week)} ${event.day} juli</p>
                    <a href="${backToRoot()}events/detail.html?id=${event.id}" class="content">
                        <h3 class="name">${event.title}</h3>
                        <p class="location">${event.location}</p>
                        <p class="time">${event.start} u.</p>
                        ${event.ticket === 'paid' ? '<p class="price">€</p>' : ''}
                    </a>
                </article>
            `
        }).join('')

        addElementToDOM(`<p><strong>${filteredEvents.length} resultaten</strong> voor "${searchText}"</p>`, '.search-results__amount')
        addElementToDOM(htmlEvents, '.search-results__results')

    })
}

function loadEventsWhenSearched() {
    const $submitElement = document.querySelector('.search__title .submit')
    $submitElement.addEventListener('click', (ev) => {
        ev.preventDefault()
    })

    const $inputElement = document.querySelector('.search__title .input')
    $inputElement.addEventListener('keyup', (ev) => {
        ev.preventDefault()
        const searchText = document.querySelector('.search__title .input').value
        if (searchText !== '') {
            loadEventResults(searchText)
            const $searchResults = document.querySelector('.search-results')
            $searchResults.classList.remove('hidden')
        }
    });
}

function init() {
    loadEventsWhenSearched()
}

init()