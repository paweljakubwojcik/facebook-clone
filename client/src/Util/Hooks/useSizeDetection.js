import { useEffect, useState } from 'react'
import { MAX_MOBILE, MAX_TABLET, MAX_DESKTOP } from '../../styles/breakpoints'

export { MAX_MOBILE, MAX_TABLET, MAX_DESKTOP }

export default function useSizeDetection() {
    const matchMobile = window.matchMedia(`(max-width:${MAX_MOBILE}px)`)
    const matchTablet = window.matchMedia(
        `(max-width:${MAX_TABLET}px) and (min-width:${MAX_MOBILE + 1}px)`
    )
    const matchDesktop = window.matchMedia(
        `(max-width:${MAX_DESKTOP}px) and (min-width:${MAX_TABLET + 1}px)`
    )
    const matchWideScreen = window.matchMedia(`(min-width:${MAX_DESKTOP + 1}px) `)

    const [isMobile, setMobile] = useState(matchMobile.matches)
    const [isTablet, setTablet] = useState(matchTablet.matches)
    const [isDesktop, setDesktop] = useState(matchDesktop.matches)
    const [isWideScreen, setWideScreen] = useState(matchWideScreen.matches)

    useEffect(() => {
        matchMobile.onchange = (match) => {
            setMobile(match.matches)
        }
        matchTablet.onchange = (match) => {
            setTablet(match.matches)
        }
        matchDesktop.onchange = (match) => {
            setDesktop(match.matches)
        }
        matchWideScreen.onchange = (match) => {
            setWideScreen(match.matches)
        }
        return () => {
            matchMobile.onchange = null
            matchTablet.onchange = null
            matchDesktop.onchange = null
            matchWideScreen.onchange = null
        }
    }, [matchDesktop, matchMobile, matchTablet, matchWideScreen])

    return { isMobile, isTablet, isDesktop, isWideScreen }
}
