import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/auth'
import { SquareButton } from '../General/Buttons'
import { PopUpMenu } from '../General/PopUpMenu'

export default function UserMenu() {
    const { logout } = useContext(AuthContext)
    const history = useHistory()

    const handleOnClick = () => {
        logout()
        history.push('/')
    }

    return (
        <PopUpMenu>
            <SquareButton onClick={handleOnClick}>
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                Log Out
            </SquareButton>
        </PopUpMenu>
    )
}

