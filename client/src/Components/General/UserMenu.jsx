import React, { useContext } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/auth'
import { SquareButton } from './Buttons'

export default function UserMenu() {
    const { logout } = useContext(AuthContext)

    return (
        <Menu>
            <SquareButton onClick={logout}>
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                Log Out
            </SquareButton>
        </Menu>
    )
}

const Menu = styled.div`
    display:flex;
    flex-direction:column;
    font-size:.8em;
    width: 200px;
    background-color: ${props => props.theme.primaryElementColor};
    position:absolute;
    right:5%;
    top:105%;
    border-radius:.5em;
`