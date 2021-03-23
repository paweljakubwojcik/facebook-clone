import styled from 'styled-components'

const Input = styled.input`
    flex: 1;
    margin: 0 0.5em;
    border-radius: 1000px;
    padding: 0.5em 1em;
    box-shadow: none;
    height: 2em;
    border: none;
    font-family: inherit;
    background-color: ${(props) => props.theme.secondaryElementColor};
    color: ${(props) => props.theme.primaryFontColor};
    resize: none;
    filter: opacity(0.8);
    transition: background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s, width .5s;
    &:focus {
        filter: opacity(1);
    }
    &:hover {
        background-color: ${(props) => props.theme.secondaryElementHover};
        filter: opacity(1);
        cursor: pointer;
    }
    &:focus:hover {
        cursor: text;
    }
`

export default Input
