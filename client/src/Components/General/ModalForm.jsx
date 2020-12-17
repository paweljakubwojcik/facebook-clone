import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { RoundButton } from './Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ModalForm({ toggleForm, onSubmit, onChange, header, children, ...rest }) {


    const modal = useRef(null)

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleForm(false)
        }
    }

    return (
        <Modal className='modal'
            ref={modal}
            onClick={handleClick}
            {...rest}
        >
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Header>
                    <h2>{header}</h2>
                    <XButton onClick={() => toggleForm(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </XButton>
                </Header>
                {
                    children
                }

            </Form>
        </Modal>
    )
}

ModalForm.propTypes = {
    header: PropTypes.string.isRequired,
    toggleForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

const Modal = styled.div`
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

const Form = styled.form`
    margin:100px 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:${props => props.theme.primaryElementColor};
    padding: 1em 2em;
    width:500px;
    border-radius:.5em;
    h2{
        padding:.6em;
        text-align:center;
        border-bottom:solid 1px #ffffff22;
        width:100%;
    }
    h3{
        margin:.5em;
    }
    .userInfo{
        display:flex;
        width:100%;
        align-items:center;
        margin:.5em;
    }
`
const Header = styled.div`
    width:100%;
    position:relative;

`

const XButton = styled(RoundButton)`
    position:absolute;
    right:0;
    bottom:5px;

`