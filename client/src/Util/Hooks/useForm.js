import { useCallback, useState } from 'react'

const fileTypes = ['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png']

function validFileType(file) {
    return fileTypes.includes(file.type)
}

/**
 *
 * @param {Function} callback - a function to be executed on submit
 * @param {*} initialState - inital state for the form values
 */
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState(null)

    const validateFiles = (fileList) => {
        const notEmptyFiles = Array.from(fileList).filter((file) => file.size !== 0)
        const imageFiles = notEmptyFiles.filter((file) => {
            if (validFileType(file)) return true
            else {
                setErrors(new Error('unsuported file type'))
                return false
            }
        })
        return imageFiles
    }

    const onChange = (e) => {
        setErrors(null)

        if (e.target.type !== 'file') setValues({ ...values, [e.target.name]: e.target.value })
        // if new value is a file
        else {
            const files = validateFiles(e.target.files)
            if (values[e.target.name])
                setValues({
                    ...values,
                    [e.target.name]: [...values[e.target.name], ...files],
                })
            else setValues({ ...values, [e.target.name]: files })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await callback()
            setValues(initialState)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * remove a value from state
     * @param {Object} value {name: value}
     */
    const removeValue = useCallback((value) => {
        const key = Object.keys(value)[0]
        setValues((values) => {
            const filteredValues = values[key].filter((val) => val !== value[key])
            return { ...values, [key]: filteredValues }
        })
    }, [])

    /**
     * add a value to state
     * @param {Object} value {name: value}
     */
    const addValue = useCallback((value) => {
        setValues((values) => {
            return { ...values, ...value }
        })
    }, [])

    return {
        onChange,
        onSubmit,
        values,
        removeValue,
        addValue,
        errors,
    }
}
