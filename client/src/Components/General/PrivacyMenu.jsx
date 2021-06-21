import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { ENUMS } from '../../Util/GraphQL_Queries'

import RadioButtonsGroup from './AnimatedMenu/RadioButtons'

export default function PrivacyMenu({ setPrivacy, currentPrivacy, children, ...rest }) {
    const { data: { __type: { enumValues } = {} } = {} } = useQuery(ENUMS, {
        variables: {
            name: 'Privacy',
        },
    })

    const buttons = enumValues
        ? enumValues.map((value) => {
              const { name } = value
              const key = (name.slice(0, 1) + name.slice(1).toLowerCase()).replace(/[_]/g, ' ')
              return {
                  key,
                  value: name,
              }
          })
        : []

    const handleClick = (e) => {
        e.target.blur()
        if (setPrivacy) setPrivacy(e.target.value)
    }

    return (
        <RadioButtonsGroup currentValue={currentPrivacy} name={'Privacy'} {...rest}>
            {children}
            {buttons.map(({ key, value }) => (
                <RadioButtonsGroup.Button value={value} onClick={handleClick} key={key}>
                    {key}
                </RadioButtonsGroup.Button>
            ))}
        </RadioButtonsGroup>
    )
}

PrivacyMenu.propTypes = {
    currentPrivacy: PropTypes.any.isRequired,
    setPrivacy: PropTypes.func,
}
