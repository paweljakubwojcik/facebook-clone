import React, { useRef } from 'react'

export default function Modal({ children, toggleModal, ...rest }) {
    const modal = useRef(null)

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleModal(false)
        }
    }

    return (
        <Modal className='modal'
            ref={modal}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Modal>
    )
}
