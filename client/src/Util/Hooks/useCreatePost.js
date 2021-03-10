import { useState } from 'react'
import { ADD_POST, GET_POSTS, DELETE_POST } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'

/**
 * @param {{body:string, title:string}} values - values for query
 * @param {(createdPost)=>void} callback - callback to execute efter uploading post , it's called with created post as an argument
 */
export const useCreatePost = (values, callback) => {
    //TODO:this hook is usless
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const { body, title, privacy, images } = values

    const [uploadPost] = useMutation(ADD_POST, {
        onError(error) {
            setLoading(false)
            setErrors(error)
            throw error
        },
        onCompleted: () => {
            setLoading(false)
        },
        variables: { body, title, privacy, images },
    })

    const createPost = () => {
        setLoading(true)
        uploadPost()
    }

    return { createPost, errors, loading }
}
