import React, { useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'


import Avatar from '../General/Avatar'
import FormButton from '../LoginPage/FormButton'

import { AuthContext } from '../../Context/auth'
import { useForm } from '../../Util/Hooks'
import { ADD_POST, GET_POSTS } from '../../Util/GraphQL_Queries'

export default function PostForm({ toggleForm }) {
    const initialState = {
        body: ''
    }

    const { user: { username, id } } = useContext(AuthContext)
    const avatar = localStorage.getItem('avatar')

    const { onChange, onSubmit, values } = useForm(createPostCallback, initialState)



    const [createPost, { error, loading }] = useMutation(ADD_POST, {
        //executed if mutation is succesful
        update(proxy, { data: { createPost } }) {
            const cacheData = proxy.readQuery({
                query: GET_POSTS,
                variables: {}
            })
            const updatedPosts = [createPost, ...cacheData.getPosts]
            proxy.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } })
            //updating cached posts on profile page
        /* const cacheDataUserSpecific = proxy.readQuery({
            query: GET_POSTS,
            variables: {
                userId: id
            }
        })
        console.log(cacheDataUserSpecific)
        const updatedUserPosts = [createPost, ...cacheDataUserSpecific.getPosts]
        proxy.writeQuery({ query: GET_POSTS, variables: { userId: id }, data: { getPosts: updatedUserPosts } }) */

            values.body = ''
            toggleForm(false)
        },
        onError(err) {
            console.log(err)
        },
        variables: values
    })

    // only purpose of this function is to call createPost... isn't it sad? 
    function createPostCallback() {
        createPost()
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('modal')) {
            toggleForm(false)
        }
    }

    return (
        <Modal className='modal' onClick={handleClick}>
            <Form onChange={onChange} onSubmit={onSubmit}>
                <h2>Create Post</h2>
                <div className='userInfo'>
                    <Avatar image={avatar} />
                    <h3>{username}</h3>
                </div>
                <textarea autoFocus name="body" id="body" placeholder={`O czym teraz myślisz, ${username}?`}></textarea>
                {error && <ErrorMessage>There was a problem during faking your status, please try later</ErrorMessage>}
                <FormButton primary inactive={values.body.trim().length === 0} loading={loading} loadingMessage={'Posting'}>Post</FormButton>
            </Form>
        </Modal>
    )
}





// ----------------------- styles begin here ----------------------------------------------
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

const ErrorMessage = styled.p`
    color:#c22c2c;
    font-size:.8em;
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
    h3{
        margin:.5em;
    }
    .userInfo{
        display:flex;
        width:100%;
        align-items:center;
        margin:.5em;
    }
    textarea{
        resize: none;
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