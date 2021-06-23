import { useState } from 'react'
import { UPDATE_USER, UPDATE_IMAGE } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { useCreatePost } from './useCreatePost'

//TODO: change this to more generic update userData or something

/**
 *
 * @param {} values
 * @param {function} callback - function to be called after updating picture
 * @param {'profileImage' or 'backgroundImage'} field
 */
export const useUpdatePicture = (values, callback, field) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    let newImageID

    const [updateUser] = useMutation(UPDATE_USER, {
        onError: (e) => {
            let error = new Error(`Error during updating user data ${e.message}`)
            throw error
        },
    })

    const [updateImage] = useMutation(UPDATE_IMAGE, {
        onError: (e) => {
            let error = new Error(`Error during updating image data ${e.message}`)
            throw error
        },
    })

    const title = `has uploaded new ${
        field === 'profileImage' ? 'profile picture' : 'background picture'
    }`

    const { createPost, errors: createPostErrors } = useCreatePost(
        { body: values?.body, privacy: 'PRIVATE', title, images: values?.image },
        async ({ images }) => {
            newImageID = images[0].id
        }
    )

    const updatePicture = async () => {
        try {
            setLoading(true)
            // if uploading new pic, then we create new post, else just change reference to wanted image
            if (typeof values.image !== 'string') {
                // newImageId = uploaded image, but in callback because I didnt implemented createPost to support returning posts value
                await createPost()
                if (createPostErrors) {
                    let error = new Error(`Error during creating post: ${createPostErrors.message}`)

                    throw error
                }
            } else {
                newImageID = values.image
            }

            await updateUser({ variables: { field: field, newValue: newImageID } })

            await updateImage({
                variables: {
                    id: newImageID,
                    field: 'role',
                    newValue: field.replace('Image', '').toUpperCase(), // I know i know
                },
            })
            await callback()
        } catch (error) {
            setError(error)
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { updatePicture, loading, error }
}
