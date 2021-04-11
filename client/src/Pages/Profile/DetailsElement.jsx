import React from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'

import ElementContainer from '../../Components/General/ElementContainer'
import { GenericButton } from '../../Components/General/Buttons'

export default function DetailsElement({ name, children }) {
    const history = useHistory()

    const handleOnClick = (e) => {
        e.target.blur()
        window.scrollTo({
            top: 150,
            behavior: 'smooth',
        })
        history.push({ hash: e.target.value })
    }

    return (
        <ElementContainer>
            <Header>
                <h2>{name.toUpperCase()}</h2>
                <BlueButton value={name} onClick={handleOnClick}>
                    See All
                </BlueButton>
            </Header>
            {children}
        </ElementContainer>
    )
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
`
