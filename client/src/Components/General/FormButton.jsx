import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function FormButton({
    children,
    type,
    primary,
    loading,
    loadingMessage,
    inactive,
    ...rest
}) {
    return (
        <StyledButton
            type={type}
            primary={primary}
            loading={loading ? 1 : 0}
            inactive={inactive ? 1 : 0}
            aria-label={children}
            {...rest}
        >
            {!loading ? children : loadingMessage || 'Loading...'}
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
    background-color: ${(props) => (props.primary ? props.theme.primaryColor : '#fff')};
    color: ${(props) => (props.primary ? '#fff' : props.theme.primaryColor)};
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    border-radius: 0.6rem;
    margin: 1em;
    //padding: .3rem 1.3em;
    display: flex;
    justify-content:center;
    align-items:center;
    height: 2.5rem;
    width: 7.5rem;
    text-align: center;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s;
    &:hover,
    &:focus {
        cursor: pointer;
        filter: brightness(1.3);
    }
    animation: ${(props) => props.loading && loading} 6s infinite
        cubic-bezier(0.66, -0.33, 0.3, 1.02);
    background-color: ${(props) => props.inactive && props.theme.secondaryElementColor};
    pointer-events: ${(props) => props.inactive && 'none'};
`
