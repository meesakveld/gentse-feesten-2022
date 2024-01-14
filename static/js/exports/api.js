const API_URL_EVENTS = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const API_URL_EVENTS_LIGHT = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const API_URL_CATEGORIES = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const API_URL_NEWS = 'https://www.pgm.gent/data/gentsefeesten/news.json';

async function fetchAPIData(APIlink) {
    try {
        const response = await fetch(APIlink);
        const data = await response.json();
        const json = await data
        return json
    } catch (error) {
        throw error;
    }
}

async function loadEvents(callback) {
    const events = await fetchAPIData(API_URL_EVENTS)
    callback(events);
}

async function loadCategories(callback) {
    const categories = await fetchAPIData(API_URL_CATEGORIES)
    callback(categories);
}

async function loadNews(callback) {
    const news = await fetchAPIData(API_URL_NEWS)
    callback(news);
}


export {
    loadEvents,
    loadCategories,
    loadNews
}