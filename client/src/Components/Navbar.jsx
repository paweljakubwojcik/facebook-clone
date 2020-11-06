import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import face from '../styles/images/face.jpg'
import logo from '../styles/svg/logo.svg'
import Avatar from './Avatar'




export default function Navbar() {
    return (
        <NavBar className='navBar'>
            <header>
                <Link to='./'>
                    <img src={logo} alt="Fake Facebook" />
                    <h1>Fake Facebook</h1>
                </Link>
            </header>
            <Link to='./'>
                <UserLink className='avatar'>
                    <Avatar image={face} altText='not anonymus faker' />
                    <div className="username">
                        Użytkownik
                    </div>
                </UserLink>
            </Link>
            <Menu>

            </Menu>
        </NavBar>
    )
}

const NavBar = styled.nav`

    position:sticky;
    top:0;
    left:0;
    z-index:2;

    display:flex;
    width:100%;
    align-items:center;
    background-color:#242526;
    border-bottom: solid 1px #444648;

    header{
        margin: .3em auto .3em 1em;
        a{
            display:flex;
            align-items:center;
        }
        h1{
            margin: 0 1em;
        }
        img{
            height:50px;
        }
    }
`
//TODO component to be extracted
const UserLink = styled.div`

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