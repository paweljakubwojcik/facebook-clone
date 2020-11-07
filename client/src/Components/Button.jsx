import styled from 'styled-components'

export default styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    margin: .4em;
    font-size:1em;
    background-color:transparent;
    border:none;
    color:${props => props.theme.secondaryFontColor};
    transition: scale .1s ,color .4s ;
    &:hover,
    &:focus{
        cursor:pointer;
        color:${props => props.theme.primaryFontColor};
    }
`