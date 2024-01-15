import { backToRoot, fullDaynameToShortForm } from '../helpers.js';

/**
 * The function `generateHTMLForEvents` generates HTML code for a list of events, including their
 * image, date, title, location, start time, and ticket price if applicable.
 * @param {Array} events - An array of event objects.
 * @param {string} type - 'box' or 'list'
 * @param {boolean} isShowingDate - The `isShowingDate` parameter is a boolean value that determines
 * whether or not to display the date information for each event. If `isShowingDate` is `true`, the
 * date information will be displayed.
 * @returns a string of HTML code generated based on the provided events array.
 */
function generateHTMLForActivity(events = [], type = 'box', isShowingDate = false) {
    return events.map((event, index) => {
        return `
            <article class="activity ${isShowingDate ? 'date' : ''} ${type} ${index % 2 === 0 ? 'small' : ''}">
                <div class="image">
                    <img loading="lazy" src="${event.image ? event.image.full : `${backToRoot() + "static/img/logos/campagne-1-G.png"}`}" alt="${event.title}">
                </div>
                <p class="date">${fullDaynameToShortForm(event.day_of_week)} ${event.day} juli</p>
                <a href="${backToRoot()}events/detail.html?day=${event.day}&slug=${event.slug}" class="content">
                    <h3 class="name">${event.title}</h3>
                    <p class="location">${event.location}</p>
                    <p class="time">${event.start} u.</p>
                    ${event.ticket === 'paid' ? '<p class="price">€</p>' : ''}
                </a>
            </article>
        `
    }).join('');
}


export { generateHTMLForActivity };