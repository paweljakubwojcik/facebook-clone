import { useEffect, useState, useRef } from 'react'

/**
 *
 * @param {*} options
 * @param {*} callback
 * @returns [setRef , visible]
 */
export const useIntersectionObserver = (options, callback) => {
    const [ref, setRef] = useState(null)
    const [root, setRoot] = useState(null)
    const [visible, setVisible] = useState(false)

    const observer = useRef()

    useEffect(() => {
        if (ref) {
            observer.current = new IntersectionObserver(
                ([entry]) => {
                    setVisible(entry.isIntersecting)
                    if (callback && entry.isIntersecting) callback(entry)
                },
                {
                    root,
                    ...options,
                }
            )
            observer.current.observe(ref)
        }
        return () => {
            if (ref) observer.current.unobserve(ref)
        }
    }, [ref, visible, options, callback, root])

    return { setRef, visible, setRoot }
}
