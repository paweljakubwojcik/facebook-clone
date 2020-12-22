import React from 'react'
import PropTypes from 'prop-types'


import ElementContainer from './ElementContainer'

import Modal from './Modal'
import Form from './Form'
export default function ModalForm({ toggleForm, onSubmit, onChange, header, children, ...rest }) {


    return (
        <Modal
            toggleModal={toggleForm}
            {...rest}
        >
            <ElementContainer noPadding style={{ width: '500px' }}>
                <Form toggleForm={toggleForm} onChange={onChange} onSubmit={onSubmit} header={header}>
                    {children}
                </Form>
            </ElementContainer>
        </Modal>
    )
}

ModalForm.propTypes = {
    header: PropTypes.string.isRequired,
    toggleForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}



