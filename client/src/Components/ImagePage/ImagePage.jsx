import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { RoundButton } from '../General/Buttons'
import Page from './Page';
import Post from './Post';



export default function ImagePage() {

    const lastLocation = useLastLocation();
    const [postId, setPostId] = useState(null)

    return (
        <Wrapper>
            <XButton as={Link} to={lastLocation?.pathname || '/'}>
                <FontAwesomeIcon icon={faTimes} />
            </XButton>
            <Router basename='image'>
                <Route path='/:id'>
                    <Page setPostId={setPostId} />
                </Route>
            </Router>
            { postId && <Post postId={postId}></Post>}
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display:flex;
    pointer-events:none;
    grid-auto-flow:row;
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    & > * {
        pointer-events:all;
    }

`

const XButton = styled(RoundButton)`
    position:absolute;
    top:5px;
    left:1em;
    z-index:3;
`



