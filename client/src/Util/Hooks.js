import { useState } from "react"
import { ADD_POST, GET_POSTS } from './GraphQL_Queries'
import { useMutation } from '@apollo/client'

/**
 *
 * @param {*} callback - a function to be executed on submit
 * @param {*} initialState - inital state for the form values
 */
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}


export const useCreatePost = (values, callback) => {

    const [createPost, { error, loading }] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        update(proxy, { data: { createPost } }) {
            const cacheData = proxy.readQuery({
                query: GET_POSTS,
                variables: {}
            })
            const updatedPosts = [createPost, ...cacheData.getPosts]
            proxy.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } })
            callback()
        },
        onError(err) {
            console.log(err)
        },
        variables: values
    })

    return [createPost, { error, loading }]
}