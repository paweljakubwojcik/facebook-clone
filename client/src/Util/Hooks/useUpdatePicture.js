import { useState } from 'react'
import { UPDATE_USER } from '../GraphQL_Queries'
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

    const [updateUser] = useMutation(UPDATE_USER, {
        update: async (_, { data: { updateUser: user } }) => {
            setLoading(false)
            await callback(user)
        },
        onError: (e) => {
            setError(e)
            throw e
        },
    })

    const title = `has uploaded new ${
        field === 'profileImage' ? 'profile picture' : 'background picture'
    }`

    const { createPost } = useCreatePost(
        { body: values?.body, privacy: 'PRIVATE', title, images: values.image },
        async ({ images }) => {
            console.log(images)
            await updateUser({ variables: { field: field, newValue: images[0].id } })
        }
    )

    const updatePicture = async () => {
        setLoading(true)

        if (typeof values.image !== 'string') await createPost()
        else {
            const value = values.image
            await updateUser({ variables: { field: field, newValue: value } })
        }
    }

    return { updatePicture, loading, error }
}
