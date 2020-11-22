
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