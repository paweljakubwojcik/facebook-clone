import { useRef } from 'react'

export default function useAudio(audioSrc) {
    const audioClip = useRef(new Audio(audioSrc))

    const play = () => {
        audioClip.current.play()
    }

    return { play }
}
