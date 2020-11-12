import React from 'react'
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'

import { GET_USER } from '../Util/GraphQL_Queries'

export default function Profile() {


    const { id } = useParams();


    const { data: { getUser: user } = {} } = useQuery(GET_USER, {
        variables: { userId: id },
    })
    console.log(user)

    return (
        <h1>
            Hello {user?.username}
        </h1>
    )
}
