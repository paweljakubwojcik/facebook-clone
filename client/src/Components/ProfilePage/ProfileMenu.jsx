import React from 'react'
import styled from 'styled-components'

import { SquareButton } from '../General/Buttons'
import RadioButtons from './RadioButtons'



export default function ProfileMenu({ width, contentType, setContentType }) {



    return (
        <ContainerBar>
            <Menu width={width}>
                <RadioButtons setContentType={setContentType} contentType={contentType} />
            </Menu>
        </ContainerBar>
    )
}

const ContainerBar = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    background-color: ${props => props.theme.primaryElementColor};
`

const Menu = styled.div`
    width:100%;
    max-width: ${props => props.width}px;
    border-top: solid 1px ${props => props.theme.secondaryFontColor}; 
`

