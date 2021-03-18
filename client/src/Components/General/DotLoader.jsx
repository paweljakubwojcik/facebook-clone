import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function DotLoader({ pulse, ...rest }) {
  return (
    <Loader {...rest} pulse={pulse ? 1 : 0} >
      <span></span>
      <span></span>
      <span></span>
    </Loader>
  )
}


const jump = keyframes`

  0%{
    transform:translatey(0);
  }
  25%{
    transform:translatey(-100%);
  }
  50%{transform:translatey(0%);}
  100%{
    transform:translatey(0);
  }

`

const pulse = keyframes`
    0%{
        filter:grayscale(0);
    },
    70% {
         filter:grayscale(0);
    },
    100% {
         filter:grayscale(1);
    }
`




const Loader = styled.div`
    display:block;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    span{
        display:block;
        width:1em;
        height:1em;
        margin:.5em;
        border-radius:50%;
        filter:grayscale(1);
        background-color:${props => props.theme.primaryColor};
        animation:${jump} 1.5s infinite cubic-bezier(.5,-0.04,.46,.67),
                ${props => props.pulse ? pulse : ''} 1.5s infinite alternate ;
        &:nth-of-type(2){
        animation-delay:.1s;
        }
        &:nth-of-type(3){
        animation-delay:.2s;
        }
    }


`
