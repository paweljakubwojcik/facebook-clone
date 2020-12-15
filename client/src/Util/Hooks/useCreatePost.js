import { useState, useContext } from "react"
import { ADD_POST, GET_POSTS, ADD_PICTURE, DELETE_POST } from '../GraphQL_Queries'
import { useMutation, gql } from '@apollo/client'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import { useLocation } from 'react-router-dom'

import { useCreateImage } from './useCreateImage'



/**
 * @param {{body:string}} values - values for query
 * @param {(createdPost)=>void} callback - callback to execute efter uploading post , it's called with created post as an argument
 */
export const useCreatePost = (values, callback) => {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const [deletePost] = useMutation(DELETE_POST)

    const { body } = values
    const { pathname } = useLocation()
    const userId = pathname.split('/')[2]


    const [uploadPost] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        async update(proxy, { data: { createPost: newPost } }) {
            try {
                const cacheData = proxy.readQuery({
                    query: GET_POSTS,
                    variables: { userId }
                })

                // calling callback, after this point there should not be any errors
                if (callback)
                    await callback(newPost)

                //updating cache
                const updatedPosts = [createPost, ...cacheData.getPosts]
                proxy.writeQuery({
                    query: GET_POSTS,
                    variables: { userId },
                    data: { getPosts: updatedPosts }
                })

            } catch (error) {
                setErrors(error)
                try {
                    //deleting unsuccesfull post to prevent leackage of data
                    await deletePost({ variables: { postId: createPost.id } })
                } catch (error) {
                    throw error
                }
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
        variables: { body }
    })

    const createPost = () => {
        setLoading(true)
        uploadPost()
    }

    return { createPost, errors, loading }
}
