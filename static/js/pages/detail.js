import { loadEvents } from "../exports/api.js";
import { addElementToDOM, backToRoot, getSearchParamsFromURL, stringToLowercaseSnakeCase } from "../exports/helpers.js"



function checkActiveDay(id, event) {
    if (id.toString() === event.day) {
        return 'class="active-day"'
    } else {
        return ''
    }
}


function loadCalendarView(event) {
    const html = `
        <li ${checkActiveDay(14, event)}><a href="${backToRoot()}events/day.html?day=14"><strong>Vr</strong>14 juli</a></li>
        <li ${checkActiveDay(15, event)}><a href="${backToRoot()}events/day.html?day=15"><strong>Za</strong>15 juli</a></li>
        <span></span>
        <li ${checkActiveDay(16, event)}><a href="${backToRoot()}events/day.html?day=16"><strong>Zo</strong>16 juli</a></li>
        <li ${checkActiveDay(17, event)}><a href="${backToRoot()}events/day.html?day=17"><strong>Ma</strong>17 juli</a></li>
        <li ${checkActiveDay(18, event)}><a href="${backToRoot()}events/day.html?day=18"><strong>Di</strong>18 juli</a></li>
        <li ${checkActiveDay(19, event)}><a href="${backToRoot()}events/day.html?day=19"><strong>Wo</strong>19 juli</a></li>
        <li ${checkActiveDay(20, event)}><a href="${backToRoot()}events/day.html?day=20"><strong>Do</strong>20 juli</a></li>
        <li ${checkActiveDay(21, event)}><a href="${backToRoot()}events/day.html?day=21"><strong>Vr</strong>21 juli</a></li>
        <span></span>
        <li ${checkActiveDay(22, event)}><a href="${backToRoot()}events/day.html?day=22"><strong>Za</strong>22 juli</a></li>
        <li ${checkActiveDay(23, event)}><a href="${backToRoot()}events/day.html?day=23"><strong>Zo</strong>23 juli</a></li>
    `

    addElementToDOM(html, '.calendar-view')
}


async function getEventFromURL() {
    const id = getSearchParamsFromURL('id');
    
    await loadEvents((data) => {
        const filteredEvent = data.find(event => event.id === id)
        loadCalendarView(filteredEvent);
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