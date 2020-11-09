import styled from 'styled-components'

export const PopUpMenu = styled.div`
    padding:.5em;
    display:flex;
    flex-direction:column;
    font-size:.8em;
    width: 200px;
    background-color: ${props => props.theme.primaryElementColor}${'aa'};
    position:absolute;
    right:5%;
    top:105%;
    border-radius:.5em;
`