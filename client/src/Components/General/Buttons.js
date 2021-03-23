import styled from 'styled-components'
import { maxTablet } from '../../styles/breakpoints'

export const GenericButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    margin: 0.3em 0;
    font-size: 1em;
    background-color: transparent;
    border: none;
    border-radius: 0.5em;
    color: ${(props) => props.theme.secondaryFontColor};
    transition: filter 0.2s, color 0.4s, background-color 0.4s;
    &:hover,
    &:focus {
        cursor: pointer;
        text-decoration: underline;
    }
    &:active {
        filter: brightness(0.9);
        transform: scale(0.95);
    }
    pointer-events: ${(props) => props.inactive && 'none'};
    color: ${(props) => props.active && props.theme.primaryColor};
`

export const RoundButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryFontColor};
    background-color: ${(props) => props.theme.roundButtonColor}${'88'};

    background-color: ${(props) => props.active && props.theme.activeButtonColor};
    color: ${(props) => props.active && props.theme.primaryFontColors};

    border-radius: 50%;
    width: ${(props) => (props.size ? props.size : 40)}px;
    height: ${(props) => (props.size ? props.size : 40)}px;
    margin: 0.3em 0.2em;
    & > * {
        margin: 0;
        pointer-events: none;
    }
    &:hover,
    &:focus {
        background-color: ${(props) => props.theme.roundButtonColor};
        text-decoration: none;
    }
`

export const SquareButton = styled(GenericButton)`
    color: ${(props) => props.active && props.theme.primaryColor};
    &:hover,
    &:focus {
        background-color: ${(props) => props.theme.roundButtonColor};
        text-decoration: none;
    }

    & > * {
        margin: 0.25em;
    }
`

export const MenuButton = styled(SquareButton)`
    width: 100%;
    justify-content: left;
    & > * {
        margin: 0.25em 0.75em;
        pointer-events: none;
    }
    color: ${(props) => props.theme.primaryFontColor};
    font-weight: lighter;
    p {
        margin-right: auto;
    }
`

export const FilledButton = styled(SquareButton)`
    color: ${(props) => props.theme.primaryFontColor};
    background-color: ${(props) =>
        props.active ? props.theme.primaryColor : props.theme.roundButtonColor};
    display: flex;
    &:hover,
    &:focus {
        background-color: ${(props) =>
            props.red ? props.theme.errorColor : props.theme.primaryColor};
        text-decoration: none;
    }
    margin: 0.5em;

    @media (max-width: 600px) {
        & > span {
            display: none;
        }
    }
`

export const ShowableButton = styled(RoundButton)`
    transition: opacity 0.3s, transform 0.3s;
    @media (min-width: ${maxTablet}) {
        opacity: 0;
        transform: scale(0.1);
    }

    ${(props) => props.parent}:hover &,
    ${(props) => props.parent}:focus & {
        opacity: 1;
        transform: scale(1);
    }
`
