import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MenuButton } from '../Buttons'

export default function RadioButtons({ handleClick, buttons, name, icon, currentValue, ...rest }) {

    const RadioButton = ({ value, name }) => {
        return (
            <RadioButtonElement
                className={'radio_button'}
                value={value}
                onClick={handleClick}
                active={currentValue === value}>
                <p>{name}</p>
                <span>
                    <span></span>
                </span>
            </RadioButtonElement>
        )
    }

    return (
        <RadioButtonsGroup {...rest}>
            {name && <div className="label">
                <FontAwesomeIcon className="icon" icon={icon} />
                <h4> {name} </h4>
            </div>}

            {buttons.map(({ key, value }) =>
                <RadioButton
                    key={key}
                    name={key}
                    value={value}
                />
            )}

        </RadioButtonsGroup>
    )
}




const RadioButtonElement = styled(MenuButton)`
    font-size:.8em;

    padding-left:3.5rem;
    justify-content:space-between;
    color:${props => props.active ? props.theme.primaryColor : 'inherit'};
    pointer-events: ${props => props.active ? 'none' : 'all'};
    span{
        color:inherit;
        display:flex;
        justify-content:center;
        align-items:center;
        border-width:1px;
        border-style:solid;
        border-color:inherit;
        width:1.4em;
        height:1.4em;
        border-radius:50%;
        margin:.4em 2em;
        span{
            margin:0;
            content:'';
            display:block;
            border:none;
            background-color:${props => props.active ? props.theme.primaryColor : 'transparent'};
            width:50%;
            height:50%;
        }
    }

`

const RadioButtonsGroup = styled.div`
    .label{
        display:flex;
        align-items:center;
        svg{
            margin: 0 .4em 0 1.3em;
        }
       pointer-events:none;
       
    }
    h4{
        border-bottom:solid 1px ${props => props.theme.borderColor}; 
        margin:.5em;
        padding:.4em;
        flex-grow:1;
    }
    
`