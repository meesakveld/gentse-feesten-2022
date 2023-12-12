/**
 * Add content to an DOM element
 * @param {string} content The content that will be inserted
 * @param {string} element The element that the content will be inserted to. Use '#' for an id, and use ',' for an element.
 */
function addElementToDOM(content, element) {
    const $element = document.querySelector(element);
    $element.innerHTML = content;
}


/**
 * Add eventlistener to DOM element
 * @param {string} onElement The DOM element to add an eventlistener. Use '#' for an id, and use ',' for an element.
 * @param {string} onEvent The event that triggers the callback
 * @param {Function} callback The action to execute when the event is triggered
 */
function addEventlistenerToElement(onElement, onEvent, callback) {
    const $element = document.querySelector(onElement);
    $element.addEventListener(onEvent, callback)
}


/**
 * Add eventlistener to DOM elements with the same id/class
 * @param {string} onElement The DOM element to add an eventlistener. Use '#' for an id, and use ',' for an element.
 * @param {string} onEvent The event that triggers the callback
 * @param {Function} callback The action to execute when the event is triggered
 */
function addEventlistenerToElements(onElement, onEvent, callback) {
    const $element = document.querySelectorAll(onElement);
    $element.addEventlisteners(onEvent, callback())
}


/**
 * Toggle class in the DOM element classlist
 * @param {string} onElement The DOM element where the class need to be toggled
 * @param {string} className The class to toggle
 */
function toggleClassToClasslistOfElement(onElement, className) {
    const $element = document.querySelector(onElement);
    $element.classList.toggle(className)
}


/**
 * The function give back the path to go back to the root of the folder. Use example: src="${backToRoot()}static/img/img01.jpg"
 * @returns E.g. './../../'
 */
function backToRoot() {
    const path = location.pathname
    let pathSlashes = 0
    for (let i = 0; i < path.length; i++) {
        if (path[i] === '/') { pathSlashes++ }
    }

    let number2 = 0
    let pathToRoot = ''
    for (let i = 1; i < path.length; i++) {
        if (path[i] === '/' && i != pathSlashes - 1) {
            switch (number2) {
                case 0: pathToRoot += './'; number2++; break;
                default: pathToRoot += '../'; break;
            }
        }
    }
    return pathToRoot
}


/**
 * Gives an random number back.
 * @param {number} limit Max number to return
 * @returns {number} Random number between 0 and 1 or the limit if provided
 */
function randomNumber(limit) {
    return (limit ? Math.floor(Math.random() * limit) : Math.random())
}



export {
    addElementToDOM,
    backToRoot,
    randomNumber,
    addEventlistenerToElement,
    addEventlistenerToElements,
    toggleClassToClasslistOfElement,
}