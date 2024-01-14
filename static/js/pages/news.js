import { loadNews } from "../exports/api.js";
import { addElementToDOM } from "../exports/helpers.js"
import { generateHTMLForNewsItem } from "../exports/components.js";


async function loadNewsItems() {
    await loadNews((data) => {
        const html = generateHTMLForNewsItem(data)
        addElementToDOM(html, '.news-items')
    })

}

async function init() {
    try {
        await loadNewsItems()
    } catch (error) {
        console.log(error)
    }
}

init();