
import { useContext } from "react"
import { ADD_PICTURE } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { FirebaseContext } from '../../Firebase/FirebaseContext'


/**
 * 
 * @param {function(uploadedPicture:Object):void} callback - a function to be executed after each image is added to DB
 */
export const useCreateImage = (callback) => {
    const { storage } = useContext(FirebaseContext)
    const storageImagesRef = storage.ref().child('images')

    const [createImage] = useMutation(ADD_PICTURE, {
        update: async (cache, { data: { uploadPicture } }) => {
            if (callback)
                await callback(uploadPicture)
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

    const storePictures = async (images, post) => {
        await Promise.all(images.map(img => storePicture(img, post)))
        return
    }

    return { storePicture, storePictures }

}