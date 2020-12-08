import { useState, useContext } from "react"
import { ADD_POST, GET_POSTS, ADD_PICTURE } from './GraphQL_Queries'
import { gql, useMutation } from '@apollo/client'
import { FirebaseContext } from '../Firebase/FirebaseContext'

/**
 *
 * @param {*} callback - a function to be executed on submit
 * @param {*} initialState - inital state for the form values
 */
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        if (e.target.type !== 'file')
            setValues({ ...values, [e.target.name]: e.target.value })
        else
            if (values[e.target.name])
                setValues({ ...values, [e.target.name]: [...values[e.target.name], ...e.target.files] })
            else
                setValues({ ...values, [e.target.name]: [...e.target.files] })
    }

    const onSubmit = e => {
        e.preventDefault()
        callback();
    }

    /**
     * remove a value from state
     * @param {Obj} value {name: value}
     */
    const removeValue = (value) => {
        const key = Object.keys(value)[0]
        const filteredValues = values[key].filter(val => val !== value[key])
        setValues({ ...values, [key]: filteredValues })
    }

    return {
        onChange,
        onSubmit,
        values,
        removeValue,
    }
}


export const useCreatePost = (values, callback) => {
    const { storage } = useContext(FirebaseContext)
    const storageImagesRef = storage.ref().child('images')


    const [createImage, imageData] = useMutation(ADD_PICTURE, {
        update: (proxy, { data: { uploadPicture } }) => {
            console.log(uploadPicture)
            const cacheData = proxy.readFragment({
                id: `Post:${uploadPicture.post.id}`,
                fragment: gql`
                    fragment newPost on Post{
                        images{
                            id
                        }
                    }
                `,
            })
            const oldImages = cacheData.images
            console.log(oldImages)
            proxy.writeFragment({
                id: `${uploadPicture.post.id}`,
                fragment: gql`
                    fragment newPost on Post{
                        images{
                            id
                        }
                    }
                `,
                data: {
                    images: [...oldImages, uploadPicture]
                }
            })
            console.log([...oldImages, uploadPicture.id])
            console.log('updated')
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const storePicture = async (image, post) => {
        try {
            const storageRef = storageImagesRef.child(`${image.name}`);
            await storageRef.put(image)
            const url = await storageRef.getDownloadURL()
            createImage({
                variables: {
                    small: url,
                    medium: url,
                    large: url,
                    post: post,
                    title: image.name
                },
            })
        } catch (error) {
            throw new Error(error)
        }

    }

    const { body, images } = values

    const [createPost, { error, loading }] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        update(proxy, { data: { createPost } }) {
            const cacheData = proxy.readQuery({
                query: GET_POSTS,
                variables: {}
            })

            const updatedPosts = [createPost, ...cacheData.getPosts]
            proxy.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } })
            images?.forEach(img => storePicture(img, createPost.id))
            callback()
        },
        onError(err) {
            console.log(err)
        },
        variables: { body }
    })

    return [createPost, { error, loading }]
}
