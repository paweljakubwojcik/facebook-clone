import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MenuButton } from '../Buttons'

//TODO: convert to compound component !!!

const RadioContext = createContext(null)
export default function RadioButtonsGroup({ name, currentValue, children, ...rest }) {
    return (
        <RadioButtons {...rest}>
            <RadioContext.Provider
                value={{
                    name,
                    currentValue,
                }}
            >
                {children}
            </RadioContext.Provider>
        </RadioButtons>
    )
}

RadioButtonsGroup.propTypes = {
    currentValue: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
}

const RadioButton = ({ value, children, ...rest }) => {
    const { name, currentValue } = useContext(RadioContext)

    return (
        <RadioButtonElement type="button" value={value} active={currentValue === value} {...rest}>
            <Input type="radio" value={value} name={name} id={value} />
            <label htmlFor={value}>{children ? children : value}</label>
            <span>
                <span></span>
            </span>
        </RadioButtonElement>
    )
}
RadioButton.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
}
RadioButtonsGroup.Button = RadioButton

RadioButtonsGroup.Header = ({ icon, children, ...rest }) => {
    return (
        <div className="label" {...rest}>
            {icon && <FontAwesomeIcon className="icon" icon={icon} />}
            <h4> {children} </h4>
        </div>
    )
}

const RadioButtonElement = styled(MenuButton)`
    font-size: 0.8em;

    padding-left: 3.5rem;
    justify-content: space-between;
    color: ${(props) => (props.active ? props.theme.primaryColor : 'inherit')};
    pointer-events: ${(props) => (props.active ? 'none' : 'all')};
    span {
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
        width: 1.4em;
        height: 1.4em;
        border-radius: 50%;
        margin: 0.4em 2em;
        span {
            color: inherit;
            margin: 0;
            content: '';
            display: block;
            border: none;
            background-color: ${(props) => (props.active ? props.theme.primaryColor : 'inherit')};
            transform: scale(${(props) => (props.active ? 1 : 0)});
            width: 50%;
            height: 50%;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
`

const RadioButtons = styled.div`
    .label {
        display: flex;
        align-items: center;
        svg {
            margin: 0 0.4em 0 1.3em;
        }
        pointer-events: none;
    }
    h4 {
        border-bottom: solid 1px ${(props) => props.theme.borderColor};
        margin: 0.5em;
        padding: 0.4em;
        flex-grow: 1;
    }
`
const Input = styled.input`
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
    z-index: -999;
`
