import React from 'react'
import styled from 'styled-components'

import face from '../styles/images/face.jpg'
import logo from '../styles/svg/logo.svg'




export default function Navbar() {
    return (
        <NavBar className='navBar'>
            <header>
                <img src={logo} alt="Fake Facebook" />
                <h1>Fake Facebook</h1>
            </header>
            <Avatar className='avatar'>
                <div className="imageContainer">
                    <img src={face} alt="" />
                </div>
                <div className="username">
                    Użytkownik
                </div>
            </Avatar>
            <Menu>

            </Menu>
        </NavBar>
    )
}

const NavBar = styled.nav`

    position:sticky;
    top:0;
    left:0;

    display:flex;
    width:100%;
    align-items:center;
    background-color:#242526;
    border-bottom: solid 1px #444648;

    header{
        display:flex;
        align-items:center;
        margin: .3em auto .3em 1em;
        h1{
            margin: 0 1em;
        }
        img{
            height:50px;
        }
    }
`

const Avatar = styled.div`

    display:flex;
    justify-content:space-evenly;
    align-items:center;

    border-radius:1em;
    padding:5px;

    transition: background-color .3s;

    &:hover{
        background-color:#444648;
        cursor:pointer;
    }

    .imageContainer{
        height:40px;
        width:40px;
    }

    img{
        border-radius:50%;
        width:auto;
        height:100%;
    }

    .username{
        font-size:.8em;
        margin: .5em 1em;
        font-weight:bold;
    }
`

const Menu = styled.menu`
    display:block;
    width:200px;
    height:100%;
    background-color:white;
`