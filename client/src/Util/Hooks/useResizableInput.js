import { useRef, useEffect } from 'react'
import propTypes from 'prop-types'

/**
 *
 * @param {{maxHeight:Number, offset: Number }} options
 * @returns resizableInputRef
 */
export default function useResizableInput({ maxHeight, offset = 0 } = {}) {
    const resizableInput = useRef(null)

    useEffect(() => {
        if (resizableInput.current) {
            resizableInput.current.style.height = '1px'

            const paddingBottom = parseFloat(
                window.getComputedStyle(resizableInput.current).paddingBottom.replace('px', '')
            )

            const height =
                resizableInput.current.scrollHeight < maxHeight || !maxHeight
                    ? resizableInput.current.scrollHeight + paddingBottom + offset
                    : maxHeight
            resizableInput.current.style.height = height + 'px'
        }
    }, [resizableInput.current?.value, maxHeight, offset])

    return resizableInput
}

useResizableInput.propTypes = {
    maxHeight: propTypes.number,
}
