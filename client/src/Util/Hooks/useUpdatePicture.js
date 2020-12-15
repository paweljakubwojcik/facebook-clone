import { useState } from "react"
import { UPDATE_USER } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { useCreatePost } from './useCreatePost'
import { useCreateImage } from './useCreateImage'

const defaultBody = 'I\'ve just changed my profile picture'

export const useUpdatePicture = (values, callback, field) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [updateUser] = useMutation(UPDATE_USER, {
        update: async () => {
            setLoading(false)
            await callback()
        },
        onError: (e) => {
            setError(e)
            throw e
        }
    })

    const { storePicture } = useCreateImage((uploadedPicture) => {
        console.log(uploadedPicture)
        updateUser(
            {
                variables: {
                    field: field,
                    newValue: uploadedPicture.id
                }
            }
        )
    })

    const { createPost } = useCreatePost({ body: values.body || defaultBody }, async (post)=>{
        await storePicture(values.image[0], post.id)
    })

    
    const updatePicture = () => {
        setLoading(true)

        if (typeof values.image !== 'string')
            createPost()
        else {
            const value = values.image
            updateUser({ variables: { field: field, newValue: value } })
        }
    }


    return { updatePicture, loading, error }
}
