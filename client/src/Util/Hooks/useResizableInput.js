import { useRef, useEffect } from 'react'
import propTypes from 'prop-types'

/**
 *
 * @param {{maxHeight:Number }} options
 * @returns resizableInputRef
 */
export default function useResizableInput({ maxHeight } = {}) {
    const resizableInput = useRef(null)

    useEffect(() => {
        if (resizableInput.current) {
            resizableInput.current.style.height = '1px'

            const paddingBottom = parseFloat(
                window.getComputedStyle(resizableInput.current).paddingBottom.replace('px', '')
            )

            const height =
                resizableInput.current.scrollHeight < maxHeight || !maxHeight
                    ? resizableInput.current.scrollHeight + paddingBottom
                    : maxHeight
            resizableInput.current.style.height = height + 'px'
        }
    }, [resizableInput.current?.value, maxHeight])

    return resizableInput
}

useResizableInput.propTypes = {
    maxHeight: propTypes.number,
}
