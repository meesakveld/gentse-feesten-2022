function addElementToDOM(content, element) {
    const $element = document.querySelector(element);
    $element.innerHTML = content;
}

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

function randomNumber(limit) {
    return Math.floor(limit ? Math.random() * limit : Math.random())
}

export {
    addElementToDOM,
    backToRoot,
    randomNumber,
}