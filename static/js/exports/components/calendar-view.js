import { backToRoot } from "../helpers.js";


function checkActiveDay(id, day) {
    if (id.toString() === day) {
        return 'class="active-day"'
    } else { return '' }
}

function generateHTMLForCalendarView(day) {
    return `
        <li ${checkActiveDay(14, day)}><a href="${backToRoot()}events/day.html?day=14"><strong>Vr</strong>14 juli</a></li>
        <li ${checkActiveDay(15, day)}><a href="${backToRoot()}events/day.html?day=15"><strong>Za</strong>15 juli</a></li>
        <span></span>
        <li ${checkActiveDay(16, day)}><a href="${backToRoot()}events/day.html?day=16"><strong>Zo</strong>16 juli</a></li>
        <li ${checkActiveDay(17, day)}><a href="${backToRoot()}events/day.html?day=17"><strong>Ma</strong>17 juli</a></li>
        <li ${checkActiveDay(18, day)}><a href="${backToRoot()}events/day.html?day=18"><strong>Di</strong>18 juli</a></li>
        <li ${checkActiveDay(19, day)}><a href="${backToRoot()}events/day.html?day=19"><strong>Wo</strong>19 juli</a></li>
        <li ${checkActiveDay(20, day)}><a href="${backToRoot()}events/day.html?day=20"><strong>Do</strong>20 juli</a></li>
        <li ${checkActiveDay(21, day)}><a href="${backToRoot()}events/day.html?day=21"><strong>Vr</strong>21 juli</a></li>
        <span></span>
        <li ${checkActiveDay(22, day)}><a href="${backToRoot()}events/day.html?day=22"><strong>Za</strong>22 juli</a></li>
        <li ${checkActiveDay(23, day)}><a href="${backToRoot()}events/day.html?day=23"><strong>Zo</strong>23 juli</a></li>
    `
}

export { generateHTMLForCalendarView }