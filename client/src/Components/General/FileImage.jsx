import { useState, useEffect } from 'react'
import propTypes from 'prop-types'

/**
 *
 * Component to convert files from fileInput to 64base url string for previewing images
 */

export default function FileImage({ children, file }) {
    const [url, setUrl] = useState(null)

    useEffect(() => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            const arrayBuffer = fileReader.result
            const blob = new Blob([arrayBuffer], [file.type])
            const blobUrl = URL.createObjectURL(blob)
            setUrl(blobUrl)
        }

        if (typeof file === 'object') fileReader.readAsArrayBuffer(file)
        else setUrl(file)
    }, [file])

    return children(url)
}

FileImage.propTypes = {
    file: propTypes.oneOfType([propTypes.object, propTypes.string]).isRequired,
    children: propTypes.func.isRequired,
}
