import { loadEvents, loadCategories } from "../exports/api.js";
import { addElementToDOM, backToRoot, getSearchParamsFromURL, stringToLowercaseSnakeCase } from "../exports/helpers.js"
import { generateHTMLForActivity, generateHTMLForCalendarView } from "../exports/components.js";

function getDateFromURL() {
    const day = getSearchParamsFromURL('day');
    const days = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    if (day === null || !days.includes(parseInt(day))) { 
        return '14'
    } else {
        return day
    }
}

function returnCurrentViewStatus() {
    const box = document.querySelector('.search-results__view-option .box')
    const list = document.querySelector('.search-results__view-option .list')

    if (box.classList.contains('active')) return 'box'
    else if (list.classList.contains('active')) return 'list'
}

function loadCalendarView() {
    const html = generateHTMLForCalendarView(getDateFromURL())
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

async function loadDayEventsBasedOnCategory(filter) {
    const $searchResultsResultsElement = document.querySelector('.search-results__results')
    $searchResultsResultsElement.innerHTML = ''

    await loadEvents(async (data) => {
        let todaysEvents = data.filter(event => event.day === getDateFromURL())

        switch (filter) {
            case "wheelchair_accessible":
                todaysEvents = todaysEvents.filter(event => event.wheelchair_accessible === true)
                break;
            case "ticket":
                todaysEvents = todaysEvents.filter(event => event.ticket === "free")
                break;
            default:
                break;
        }

        await loadCategories(categories => {

            for (const category of categories.sort()) {

                const categoryEvents = todaysEvents.filter(event => event.category[0] === category)

                if (categoryEvents.length !== 0) {

                    const events = generateHTMLForActivity(categoryEvents, returnCurrentViewStatus())

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

async function filterResults() {
    const $wheelchairElement = document.querySelector('#ftr-wheelchair')
    const $priceElement = document.querySelector('#ftr-price')
    
    $wheelchairElement.addEventListener('click', async () => {
        await loadDayEventsBasedOnCategory('wheelchair_accessible')
    })

    $priceElement.addEventListener('click', async () => {
        await loadDayEventsBasedOnCategory('ticket')
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
        await filterResults()
        loadTitle()
    } catch (error) {
        console.log(error)
    }
}

init()
