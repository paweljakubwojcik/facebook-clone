import { useState } from 'react'
import { ADD_POST, GET_POSTS, DELETE_POST } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'

/**
 * @param {{body:string, title:string}} values - values for query
 * @param {(createdPost)=>void} callback - callback to execute efter uploading post , it's called with created post as an argument
 */
export const useCreatePost = (values, callback) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const { body, title, privacy, images } = values

    const { pathname } = useLocation()
    const userId = pathname.split('/')[2]
    console.log(userId)

    const [uploadPost] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        async update(proxy, { data: { createPost: newPost } }) {
            try {
                const cacheData = proxy.readQuery({
                    query: GET_POSTS,
                    variables: { userId },
                })

                // calling callback, after this point there should not be any errors
                if (callback) await callback(newPost)

                //updating cache
                const updatedPosts = [newPost, ...cacheData.posts]
                proxy.writeQuery({
                    query: GET_POSTS,
                    variables: { userId },
                    data: { posts: updatedPosts },
                })
            } catch (error) {
                setErrors(error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        onError(error) {
            setLoading(false)
            setErrors(error)
            throw error
        },
        variables: { body, title, privacy, images },
    })

    const createPost = () => {
        setLoading(true)
        uploadPost()
    }

    return { createPost, errors, loading }
}
