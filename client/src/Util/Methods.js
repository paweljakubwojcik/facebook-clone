
/**
 * returns offset postition from parent
 * @param {DOMElement} element 
 * @returns {Object} {x: x offset , y: y offset}
 */
export const getOffsetPosition = (element) => {
    const previousElement = element.previousElementSibling
    if (previousElement)
        return {
            x: previousElement.clientWidth + getOffsetPosition(previousElement).x,
            y: previousElement.clientHeight + getOffsetPosition(previousElement).y,
        }
    else
        return {
            x: 0,
            y: 0
        }
}


/**
 *
 * @param {Array} array - array to shuffle
 * @returns shufled array
 */
export const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}