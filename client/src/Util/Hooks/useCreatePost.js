import { useState, useContext } from "react"
import { ADD_POST, GET_POSTS, ADD_PICTURE, DELETE_POST } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { FirebaseContext } from '../../Firebase/FirebaseContext'


export const useCreatePost = (values, callback) => {
    const { storage } = useContext(FirebaseContext)
    const storageImagesRef = storage.ref().child('images')

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [uploadedPictures, setUploadedPictures] = useState([])

    const [deletePost] = useMutation(DELETE_POST)

    const [createImage] = useMutation(ADD_PICTURE, {
        update: (cache, { data: { uploadPicture } }) => {
            const newImage = uploadPicture.id
            setUploadedPictures(p => [...p, newImage])
        },
        onError: (error) => {
            console.log(error)
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
            console.log(error)
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

    return { createPost, errors, loading, uploadedPictures }
}
