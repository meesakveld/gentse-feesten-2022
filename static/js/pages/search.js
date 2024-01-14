import { loadEvents } from "../exports/api.js";
import { addElementToDOM, fullDaynameToShortForm, backToRoot } from "../exports/helpers.js"
import { generateHTMLForActivity } from "../exports/components.js";

function getViewOption() {
    const viewStatus = document.querySelector('.active')
    const activeView = viewStatus.classList
    return activeView[0]
}

async function loadEventResults(searchText) {
    await loadEvents((data) => {
        const filteredEvents = data.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));
        const htmlEvents = generateHTMLForActivity(filteredEvents, 'box', true)

        addElementToDOM(`<p><strong>${filteredEvents.length} resultaten</strong> voor "${searchText}"</p>`, '.search-results__amount')
        addElementToDOM(htmlEvents, '.search-results__results')

        const $searchResults = document.querySelector('.search-results')
        $searchResults.classList.remove('hidden')
        
    })
}

async function loadEventsFromUrlQuery() {

    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('query');

    if (!searchText) return 
    await loadEventResults(searchText)

}

async function init() {
    try {
        await loadEventsFromUrlQuery()
    } catch (error) {
        console.log(error)
    }
}

init();