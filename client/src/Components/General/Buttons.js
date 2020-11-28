import styled from 'styled-components'

export const GenericButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    padding: .4em;
    margin: .3em 0;
    font-size:1em;
    background-color:transparent;
    border:none;
    border-radius:.5em;
    color:${props => props.theme.secondaryFontColor};
    transition: filter .2s ,color .4s, background-color .4s ;
    &:hover,
    &:focus{
        cursor:pointer;
        filter:brightness(1.2);
        text-decoration:underline;
    }
    &:active{
        filter:brightness(.9);
        transform:scale(.95);
    }
    pointer-events:${props => props.inactive && 'none'};
    color: ${props => props.active && props.theme.primaryColor};
    
`

export const RoundButton = styled(GenericButton)`
    color:${props => props.theme.primaryFontColor};
    background-color:${props => props.theme.roundButtonColor};
    
    background-color:${props => props.active && props.theme.activeButtonColor};
    color: ${props => props.active && props.theme.primaryFontColors};
    
    border-radius:50%;
    width:40px;
    height:40px;
    margin: .3em .2em;
    & > *{
        margin:0;
        pointer-events:none;
    }
`

export const SquareButton = styled(GenericButton)`

    color: ${props => props.active && props.theme.primaryColor};
    &:hover,
    &:focus{
        background-color:${props => props.theme.roundButtonColor};
        text-decoration:none;
    }
    
    & > *{
        margin:.25em;
    }
`

export const MenuButton = styled(SquareButton)`

    width:100%;
    justify-content:left;
    & > *{
        margin: .25em .75em;
        pointer-events:none;
    }
    color: ${props => props.theme.primaryFontColor};
    font-weight:lighter;

`