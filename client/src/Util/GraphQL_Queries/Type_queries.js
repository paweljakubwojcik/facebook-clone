import { gql } from '@apollo/client'

export const ENUMS = gql`
    query __type($name: String!) {
        __type(name: $name) {
            enumValues {
                name
            }
        }
    }
`
