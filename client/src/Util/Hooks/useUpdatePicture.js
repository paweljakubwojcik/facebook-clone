import { useState } from "react"
import { UPDATE_USER } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { useCreatePost } from './useCreatePost'



export const useUpdatePicture = (values, callback, field) => {

    const [loading, setLoading] = useState(false)

    const [updateUser, { error }] = useMutation(UPDATE_USER, {
        update: () => {
            setLoading(false)
            callback()
        },
        onError: (e) => {
            throw e
        }
    })

    const { createPost, uploadedPictures } = useCreatePost({ body: values.body, images: values.image },
        () => {
            console.log(uploadedPictures)
            updateUser({ variables: { field: field, newValue: uploadedPictures[0] } })
        })

    const updatePicture = (type) => {
        setLoading(true)

        if (typeof values.image !== 'string')
            createPost()
        else {
            const value = values.image
            updateUser({ variables: { field: field, newValue: value } })
        }
    }


    return { updatePicture, loading }
}
