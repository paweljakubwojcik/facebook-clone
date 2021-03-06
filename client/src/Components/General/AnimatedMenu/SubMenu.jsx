import React, { useContext } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from '../Buttons'

import { AnimationContext } from './AnimatedMenu'

export default function SubMenu({ title, children, setActive }) {
    const { main } = useContext(AnimationContext)

    return (
        <>
            <Header>
                <RoundButton type="button" onClick={() => setActive(main)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </RoundButton>
                <h3>{title}</h3>
            </Header>
            {children}
        </>
    )
}

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0.4em;
    h3 {
        pointer-events: none;
        margin: 0.5em;
    }
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
`
