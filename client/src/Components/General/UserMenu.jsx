import React, { useContext } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/auth'
import { SquareButton } from './Buttons'
import { PopUpMenu } from './PopUpMenu'

export default function UserMenu() {
    const { logout } = useContext(AuthContext)

    return (
        <PopUpMenu>
            <SquareButton onClick={logout}>
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                Log Out
            </SquareButton>
        </PopUpMenu>
    )
}

