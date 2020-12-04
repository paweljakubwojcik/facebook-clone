import React from 'react'
import { useParams } from 'react-router-dom'

export default function ImagePage() {

    const { id } = useParams()

    return (
        <h1>
            {id}
        </h1>
    )
}
