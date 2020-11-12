import React from 'react'
import styled from 'styled-components'
import UserLink from '../General/UserLink'





export default function ContactList() {
    return (
        <Container>
            <h2>Kontakty</h2>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(key => <UserLink key={key} />)}
        </Container>
    )
}


const Container = styled.div`
    position:fixed;
    right:2%;
    width:300px;
    height:92vh;
    display:flex;
    flex-direction:column;
    
   
   
    h2{
        padding: .5em 0;
        width:100%;
        color: ${props => props.theme.secondaryFontColor};
        border-bottom: solid 1px ${props => props.theme.secondaryFontColor};
    }
    & > * {
        margin: .2em;
    }

    @media (max-width:1260px){
        display:none;
    }
    overflow:auto;
    overflow-x:hidden;
    scrollbar-width: thin;          /* "auto" or "thin"  */
    scrollbar-color: ${props => props.theme.secondaryFontColor} ${props => props.theme.primaryElementColor};   /* scroll thumb & track */

        &::-webkit-scrollbar {
        width: 12px;
        }
        &::-webkit-scrollbar-track {
        background:${props => props.theme.primaryElementColor};
        }
        &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.secondaryFontColor};
        border-radius: 20px;
        }

`