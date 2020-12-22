
import { useContext } from "react"
import { ADD_PICTURE } from '../GraphQL_Queries'
import { useMutation } from '@apollo/client'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import { readFileAsync, generateRandomName } from '../Methods'

import Pica from 'pica'
const pica = new Pica()


const initializeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
        const image = document.createElement('img')
        image.src = await readFileAsync(file)
        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
    })
}

/**
 * returns an array of resized pictures
 * 
 * @param {Blob} file 
 * @returns {Array} Array of { source: blob, size: string}
 */
const getResizedImages = async (file) => {

    const image = await initializeImage(file)
    const aspectRatio = image.height / image.width

    const small = document.createElement('canvas')
    small.width = 192
    small.height = aspectRatio * small.width

    const medium = document.createElement('canvas')
    medium.width = 900
    medium.height = aspectRatio * medium.width

    const large = document.createElement('canvas')
    large.width = image.width > 1920 ? 1920 : image.width
    large.height = aspectRatio * large.width


    try {
        return await Promise.all(Object.entries({ small, medium, large }).map(async ([size, target]) => {
            const result = await pica.resize(image, target)
            const blobImage = await pica.toBlob(result, 'image/jpeg', 0.90)
            return { source: blobImage, size }
        }))

    } catch (error) {
        throw error
    }

}


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
            const images = await getResizedImages(image)
            const urlsArray = await Promise.all(images.map(async ({ source, size }) => {
                const storageRef = storageImagesRef.child(`${image.name.replace('.jpg', '') + generateRandomName() + '-' + size}.jpg`);
                await storageRef.put(source)
                const url = await storageRef.getDownloadURL()
                return [size, url]
            }))

            const urls = Object.fromEntries(urlsArray)

            await createImage({
                variables: {
                    ...urls,
                    post: post,
                    title: image.name + generateRandomName()
                },
            })
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    const storePictures = async (images, post) => {
        try {
            await Promise.all(images.map(img => storePicture(img, post)))
            return
        } catch (error) {
            throw error
        }

    }

    return { storePicture, storePictures }

}


