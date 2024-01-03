import { loadEvents, loadCategories } from "../exports/api.js";
import { addElementToDOM, backToRoot, getSearchParamsFromURL, stringToLowercaseSnakeCase } from "../exports/helpers.js"

function getDateFromURL() {
    const day = getSearchParamsFromURL('day');
    if (day === null) { 
        return '14'
    } else {
        return day
    }
}

function checkActiveDay(id) {
    if (id.toString() === getDateFromURL()) {
        return 'class="active-day"'
    } else {
        return ''
    }
}

function loadCalendarView() {
    const html = `
        <li ${checkActiveDay(14)}><a href="${backToRoot()}events/day.html?day=14"><strong>Vr</strong>14 juli</a></li>
        <li ${checkActiveDay(15)}><a href="${backToRoot()}events/day.html?day=15"><strong>Za</strong>15 juli</a></li>
        <span></span>
        <li ${checkActiveDay(16)}><a href="${backToRoot()}events/day.html?day=16"><strong>Zo</strong>16 juli</a></li>
        <li ${checkActiveDay(17)}><a href="${backToRoot()}events/day.html?day=17"><strong>Ma</strong>17 juli</a></li>
        <li ${checkActiveDay(18)}><a href="${backToRoot()}events/day.html?day=18"><strong>Di</strong>18 juli</a></li>
        <li ${checkActiveDay(19)}><a href="${backToRoot()}events/day.html?day=19"><strong>Wo</strong>19 juli</a></li>
        <li ${checkActiveDay(20)}><a href="${backToRoot()}events/day.html?day=20"><strong>Do</strong>20 juli</a></li>
        <li ${checkActiveDay(21)}><a href="${backToRoot()}events/day.html?day=21"><strong>Vr</strong>21 juli</a></li>
        <span></span>
        <li ${checkActiveDay(22)}><a href="${backToRoot()}events/day.html?day=22"><strong>Za</strong>22 juli</a></li>
        <li ${checkActiveDay(23)}><a href="${backToRoot()}events/day.html?day=23"><strong>Zo</strong>23 juli</a></li>
    `

    addElementToDOM(html, '.calendar-view')
}

function loadThreeRandomActivities() {
    loadEvents((data) => {
        const today = getDateFromURL()
        const events = data.filter(event => event.day === today)
        const arr = []
        for (let i = 0; i < 3; i++) {
            arr.push(events[Math.floor(Math.random() * events.length)])
        }

        const html = arr.map((event, index) => {
            return `
                <article class="activity box ${index % 2 === 0 ? 'small' : ''}">
                    <div class="image">
                        <img src="${event.image ? event.image.full : `${backToRoot() + "static/img/logos/campagne-1-G.png"}`}" alt="${event.title}">
                    </div>
                    <a href="${backToRoot()}events/detail.html?id=${event.id}" class="content">
                        <h3 class="name">${event.title}</h3>
                        <p class="location">${event.location}</p>
                        <p class="time">${event.start} u.</p>
                        <p class="price">${event.ticket === 'paid' ? '€' : ''}</p>
                    </a>
                </article>
            `
        }).join('');

        addElementToDOM(html, '.threeRandomActivities')
    })
}

function loadCategoriesInFilterMenu() {
    loadCategories((data) => {
        const html = data.sort().map(category => {
            return `
                <li><a href="${backToRoot()}events/day.html#${stringToLowercaseSnakeCase(category)}">${category}</a></li>
            `
        }).join('');

        addElementToDOM(html, '.filter__options-specific')
    })
}

function loadDayEventsBasedOnCategory() {
    const $searchResultsResultsElement = document.querySelector('.search-results__results')

    loadEvents((data) => {
        const todaysEvents = data.filter(event => event.day === getDateFromURL())

        loadCategories(categories => {

            for (const category of categories.sort()) {

                const categoryEvents = todaysEvents.filter(event => event.category[0] === category)

                if (categoryEvents.length !== 0) {

                    const events = categoryEvents.map((event, index) => {
                        return `
                            <article class="activity box ${index % 2 === 0 ? 'small' : ''}">
                                <div class="image">
                                    <img src="${event.image ? event.image.full : `${backToRoot() + "static/img/logos/campagne-1-G.png"}`}" alt="${event.title}">
                                </div>
                                <a href="${backToRoot()}events/detail.html?id=${event.id}" class="content">
                                    <h3 class="name">${event.title}</h3>
                                    <p class="location">${event.location}</p>
                                    <p class="time">${event.start} u.</p>
                                    ${event.ticket === 'paid' ? '<p class="price">€</p>' : ''}
                                </a>
                            </article>
                        `
                    }).join('');

                    $searchResultsResultsElement.innerHTML += `
                        <div class="filtered-events-section">
                            <h2 id="${stringToLowercaseSnakeCase(category)}">${category}</h2>
                            <div class="filtered-events">
                                ${events}
                            </div>
                        </div>
                    `
                }
            }
        })
    })
}



function init() {
    loadCalendarView()
    loadThreeRandomActivities()
    loadCategoriesInFilterMenu()
    loadDayEventsBasedOnCategory()
}

init()
