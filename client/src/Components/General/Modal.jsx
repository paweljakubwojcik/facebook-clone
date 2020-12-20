import React, { useRef } from 'react'
import styled from 'styled-components'

export default function Modal({ children, toggleModal, ...rest }) {
    const modal = useRef(null)

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleModal(false)
        }
    }

    return (
        <Container className='modal'
            ref={modal}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Container>
    )
}

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#00000044;
    overflow-y:auto;
`