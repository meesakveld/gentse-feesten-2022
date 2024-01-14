import { loadEvents, loadCategories } from "../exports/api.js";
import { addElementToDOM, backToRoot, getSearchParamsFromURL, stringToLowercaseSnakeCase, fullDaynameToShortForm } from "../exports/helpers.js"
import { generateHTMLForActivity } from "../exports/components.js";

function getDateFromURL() {
    const day = getSearchParamsFromURL('day');
    const days = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    if (day === null || !days.includes(parseInt(day))) { 
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

async function loadThreeRandomActivities() {
    await loadEvents((data) => {
        const today = getDateFromURL()
        const events = data.filter(event => event.day === today)
        const arr = []
        for (let i = 0; i < 3; i++) {
            arr.push(events[Math.floor(Math.random() * events.length)])
        }

        addElementToDOM(generateHTMLForActivity(arr), '.threeRandomActivities')
    })
}

async function loadCategoriesInFilterMenu() {
    await loadCategories((data) => {
        const html = data.sort().map(category => {
            return `
                <li><a href="${backToRoot()}events/day.html?day=${getDateFromURL()}#${stringToLowercaseSnakeCase(category)}">${category}</a></li>
            `
        }).join('');

        addElementToDOM(html, '.filter__options-specific')
    })
}

async function loadDayEventsBasedOnCategory() {
    const $searchResultsResultsElement = document.querySelector('.search-results__results')

    await loadEvents(async (data) => {
        const todaysEvents = data.filter(event => event.day === getDateFromURL())

        await loadCategories(categories => {

            for (const category of categories.sort()) {

                const categoryEvents = todaysEvents.filter(event => event.category[0] === category)

                if (categoryEvents.length !== 0) {

                    const events = generateHTMLForActivity(categoryEvents)

                    $searchResultsResultsElement.innerHTML += `
                        <div class="filtered-events-section">
                            <div class="title">
                                <h2 id="${stringToLowercaseSnakeCase(category)}">${category}</h2>
                                <a href="#filter"><img src="${backToRoot()}static/img/icons/arrow-up.svg" alt="arrow up"></a>
                            </div>
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

function loadTitle() {
    const $title = document.querySelector('head title')
    const day = getDateFromURL()
    $title.innerHTML = `${day} juli | Gentse Feesten 2023`
}



async function init() {
    try {
        loadCalendarView()
        await loadThreeRandomActivities()
        await loadCategoriesInFilterMenu()
        await loadDayEventsBasedOnCategory()
        loadTitle()
    } catch (error) {
        console.log(error)
    }
}

init()
