import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'

import Button from './LoginPage/Button'

export default function PostForm({ toggleForm }) {

    const handleClick = (e) => {
        if (e.target.classList.contains('modal'))
            toggleForm(false)

    }

    return (
        <Modal className='modal' onClick={handleClick}>
            <Form>
                <h2>Create Post</h2>
                <div className='userInfo'>
                    <Avatar />
                    <h3>User</h3>
                </div>
                <textarea name="body" id="body" placeholder="O czym teraz myślisz, user?"></textarea>
                <Button primary>Post</Button>
            </Form>
        </Modal>
    )
}


const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:2;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#00000044;
`

const Form = styled.form`
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
    .userInfo{
        display:flex;
        width:100%;
        align-items:center;
        margin:.5em;
    }
    textarea{
        font-family:inherit;
        font-size:inherit;
        color:inherit;
        font-family:inherit;
        background-color:transparent;
        border:none;
        width:100%;
        height:100px;
    }
`