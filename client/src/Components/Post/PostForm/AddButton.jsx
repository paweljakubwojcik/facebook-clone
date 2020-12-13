import React from 'react'

import styled from 'styled-components'


import { faImages } from '@fortawesome/free-solid-svg-icons'
import ExpandableButton from '../../General/ExpandableButton'


export default function AddButton({ ...rest }) {


    return (
        <ExpandableButton {...rest} icon={faImages}>
            Add Picture
        </ExpandableButton>
    )
}
