import { useState, useContext } from "react"
import { ADD_POST, GET_POSTS, ADD_PICTURE, DELETE_POST } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { FirebaseContext } from '../../Firebase/FirebaseContext'


export const useCreatePost = (values, callback) => {
    const { storage } = useContext(FirebaseContext)
    const storageImagesRef = storage.ref().child('images')

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const [deletePost] = useMutation(DELETE_POST)

    const [createImage] = useMutation(ADD_PICTURE, {
        onError: (error) => {
            throw error
        }
    })

    const storePicture = async (image, post) => {
        try {
            const storageRef = storageImagesRef.child(`${image.name}`);
            await storageRef.put(image)
            const url = await storageRef.getDownloadURL()
            await createImage({
                variables: {
                    small: url,
                    medium: url,
                    large: url,
                    post: post,
                    title: image.name
                },
            })
        } catch (error) {
            throw error
        }

    }

    const { body, images } = values

    const [uploadPost] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        async update(proxy, { data: { createPost } }) {
            try {
                const cacheData = proxy.readQuery({
                    query: GET_POSTS,
                    variables: {}
                })
                //storing all pictures in firebase storage, throws error 
                await Promise.all(images?.map(img => storePicture(img, createPost.id)))
                //updating cache
                const updatedPosts = [createPost, ...cacheData.getPosts]
                proxy.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } })
                callback()
            } catch (error) {
                console.log(error)
                setErrors(error)
                //deleting unsuccesfull post to prevent leackage of data
                deletePost({ variables: { postId: createPost.id } })
            } finally {
                setLoading(false)
            }
        },
        onError(error) {
            setLoading(false)
            setErrors(error)
        },
        variables: { body }
    })

    const createPost = () => {
        setLoading(true)
        uploadPost()
    }

    return [createPost, errors, loading]
}
