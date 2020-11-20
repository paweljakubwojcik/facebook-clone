import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function FormButton({ children, type, primary, loading, loadingMessage, inactive }) {
  return (
    <StyledButton type={type} primary={primary} loading={loading ? 1 : 0} inactive={inactive ? 1 : 0}>
      {!loading ? children : (loadingMessage || 'Loading...')}
    </StyledButton>
  )
}

const loading = keyframes`
    0%{
    transform: scaleX(1);
  }
  10%{
    transform: scaleX(.33);
    border-radius:50%;
    color:transparent;
  }
  30%{
        transform:scaleX(.33) translateX(-200%);
        border-radius:50%;
        color:transparent;
  }
    50%{
        transform:scaleX(.33) translateX(200%);
        border-radius:50%;
        color:transparent;
  }
65%{
    transform: scaleX(.33) translateX(0);
    border-radius:50%;
    color:transparent;
}
  70%{
    transform: scaleX(.33) translateX(0);
    color:transparent;
  }
  80% {
    transform: scaleX(1);
  }
`

const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primaryColor : props.theme.primaryFontColor};
    color: ${props => props.primary ? props.theme.primaryFontColor : props.theme.primaryColor};
    font-family:inherit;
    font-weight:bold;
    width:9em;
    height:3em;
    border-radius:1.5em;
    margin:1.3em;
    transition:transform .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover, &:focus{
        cursor:pointer;
        transform:scale(1.1);
    }
    animation: ${props => props.loading && loading} 6s infinite cubic-bezier(.66,-0.33,.3,1.02);
    background-color: ${props => props.inactive && props.theme.secondaryElementColor};
    pointer-events: ${props => props.inactive && 'none'};
`


