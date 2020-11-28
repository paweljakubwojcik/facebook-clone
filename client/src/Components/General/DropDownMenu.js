import styled from 'styled-components'

export const DropDownMenu = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    padding:.5em;
    font-size:.8em;
    width: ${props => props.small ? '200px' : '300px'};
    background-color: ${props => props.theme.primaryElementColor};
    position:absolute;
    right:${props => props.small ? '1.5%' : '5%'};;
    top:100%;
    border-radius:.5em;
    border: solid 1px  ${props => props.theme.borderColor};
    box-shadow: ${props => props.theme.standardShadow};
    overflow:hidden;
    transition: height .5s;

    &:before{
        content:'';
        position:absolute;
        z-index:0;
        display:block;
        background-color:inherit;
        width:10px;
        height:10px;
        transform-origin:center center;
        transform:rotate(45deg) translate(0,-70%);
        top:0;
        right:1em;
        
       // box-shadow:inherit;
        border-top: solid 1px  ${props => props.theme.borderColor};
        border-left: solid 1px  ${props => props.theme.borderColor};
    }

`