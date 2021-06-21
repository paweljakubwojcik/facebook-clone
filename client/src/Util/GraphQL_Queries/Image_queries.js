import { gql } from '@apollo/client'

export const GET_IMAGE = gql`
    query image($imageId: ID!) {
        image(imageId: $imageId) {
            id
            title
            createdAt
            uploadedBy
            urls {
                id
                small
                medium
                large
            }
            author {
                name
                link
            }
            post {
                id
                images {
                    id
                }
            }
        }
    }
`

export const UPDATE_IMAGE = gql`
    mutation updatePicture($id: ID!, $field: String!, $newValue: String!) {
        updatePicture(id: $id, field: $field, newValue: $newValue) {
            id
        }
    }
`

export const ADD_PICTURE = gql`
    mutation uploadPicture(
        $post: ID!
        $small: String!
        $medium: String!
        $large: String!
        $title: String
    ) {
        uploadPicture(
            ImageInput: {
                urls: { small: $small, medium: $medium, large: $large }
                post: $post
                title: $title
            }
        ) {
            id
            urls {
                id
                large
                medium
                small
            }
            post {
                id
            }
        }
    }
`

export const GET_IMAGE_OF_THE_DAY = gql`
    query imageOfTheDay {
        imageOfTheDay {
            id
            title
            createdAt
            urls {
                id
                large
            }
            author {
                name
                link
            }
        }
    }
`
