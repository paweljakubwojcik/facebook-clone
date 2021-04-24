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
    const [error, setError] = useState(false)
    let newImageID

    const [updateUser] = useMutation(UPDATE_USER, {
        onError: (e) => {
            setError(e)
            throw e
        },
    })

    const [updateImage] = useMutation(UPDATE_IMAGE, {})

    const title = `has uploaded new ${
        field === 'profileImage' ? 'profile picture' : 'background picture'
    }`

    const { createPost } = useCreatePost(
        { body: values?.body, privacy: 'PRIVATE', title, images: values.image },
        async ({ images }) => {
            newImageID = images[0].id
        }
    )

    const updatePicture = async () => {
        setLoading(true)

       
        if (typeof values.image !== 'string') {
            // newImageId = uploaded image, but in callback because I didnt implemented createPost to support returning posts value
            await createPost()
        } else {
            newImageID = values.image
        }

        await updateUser({ variables: { field: field, newValue: newImageID } })

        updateImage({
            variables: {
                id: newImageID,
                field: 'role',
                newValue: field.replace('Image', '').toUpperCase(), // I know i know XD
            },
            update: async () => {
                await callback()
                setLoading(false)
            },
        })
    }

    return { updatePicture, loading, error }
}
