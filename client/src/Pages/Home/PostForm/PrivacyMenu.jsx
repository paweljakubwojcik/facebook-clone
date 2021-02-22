import React from 'react'

import SubMenu from '../../../Components/General/AnimatedMenu/SubMenu'
import RadioButtons from '../../../Components/General/AnimatedMenu/RadioButtons'

const buttons = [
    {
        key: 'Private',
        value: 'PRIVATE',
    },
    {
        key: 'Public',
        value: 'PUBLIC',
    },
    {
        key: 'Friends Only',
        value: 'FRIENDS_ONLY',
    },
]

export default function PrivacyMenu({ setActive, setPrivacy, currentPrivacy }) {
    const handleClick = (e) => {
        e.target.blur()
        setPrivacy(e.target.value)
    }

    return (
        <SubMenu title={'Privacy'} setActive={setActive}>
            <RadioButtons
                handleClick={handleClick}
                buttons={buttons}
                currentValue={currentPrivacy}
                name={''}
                icon={null}
                style={{ fontSize: '1.2em' }}
            />
        </SubMenu>
    )
}
