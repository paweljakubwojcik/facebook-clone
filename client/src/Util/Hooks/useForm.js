import { useCallback, useState } from 'react'

/**
 *
 * @param {Function} callback - a function to be executed on submit
 * @param {*} initialState - inital state for the form values
 */
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        if (e.target.type !== 'file') setValues({ ...values, [e.target.name]: e.target.value })
        else if (values[e.target.name])
            setValues({ ...values, [e.target.name]: [...values[e.target.name], ...e.target.files] })
        else setValues({ ...values, [e.target.name]: [...e.target.files] })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        callback()
    }

    /**
     * remove a value from state
     * @param {Obj} value {name: value}
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
     * @param {{value: newValue}} value {name: value}
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
    }
}
