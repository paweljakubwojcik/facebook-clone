import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import ElementContainer from './ElementContainer'
import FormButton from './FormButton'

export default function AreYouSureBox({ callback, callbackMessage, children, close }) {


    const handleOnClick = () => {
        if (callback)
            callback()
    }

    return (
        <Modal toggleModal={close}>
            <div style={{ maxWidth: '600px' }}>
                <ElementContainer noMargins>
                    <Header>{children}</Header>
                    <Buttons >
                        <FormButton primary onClick={handleOnClick}>{callbackMessage || "Do it"}</FormButton>
                        <FormButton primary onClick={close}>Cancel</FormButton>
                    </Buttons>
                </ElementContainer>
            </div>
        </Modal>
    )
}

const Header = styled.h2`

        padding:.6em;
        text-align:center;
        border-bottom:solid 1px ${props => props.theme.borderColor};
        width:100%;

`

const Buttons = styled.div`

       display:flex;
       width:100%;
       justify-content:space-evenly;

`