import React from 'react'


import { faImages } from '@fortawesome/free-solid-svg-icons'
import ExpandableButton from '../../General/ExpandableButton'


export default function AddButton({ ...rest }) {


    return (
        <ExpandableButton {...rest} icon={faImages}>
            Add Picture
        </ExpandableButton>
    )
}
