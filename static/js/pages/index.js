import { loadEvents, loadNews } from "../exports/api.js";
import { addElementToDOM, backToRoot } from "../exports/helpers.js"
import { generateHTMLForActivity } from "../exports/components.js";

async function loadEightRandomEvents() {
    await loadEvents((data) => {
        // Filter on events with images
        const eventsWithImages = data.filter(event => event.image !== null)

        // Generate 8 random events
        let events = [];
        for (let i = 0; i < 8; i++) {
            events.push(eventsWithImages[Math.floor(Math.random() * eventsWithImages.length)])
        }

        // Add events to the div
        addElementToDOM(generateHTMLForActivity(events, 'box', true), '.featured-events__events')

    })
}

async function loadLatestNewsItems() {
    await loadNews((data) => {
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

async function init() {
    try {
        await loadEightRandomEvents()
        await loadLatestNewsItems()
    } catch (error) {
        console.log(error)
    }
}

init()