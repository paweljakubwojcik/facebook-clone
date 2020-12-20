import { useEffect, useState } from 'react'



export const useIntersectionObserver = (options, callback) => {
    const [ref, setRef] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting)
        }, options)
        if (ref)
            observer.observe(ref)

        return () => {
            if (ref)
                observer.unobserve(ref)
        }

    }, [ref, visible, options])


    return [setRef, visible]

}