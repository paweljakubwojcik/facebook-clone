import styled from 'styled-components'

export const Form = styled.form`
    h2{
        font-size:2em;
        width:100%;
        text-align:center;
    }   
    justify-self:center;
    align-self:center;
    padding:1em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .link{
        display:flex;
        width:100%;
        justify-content:end;
        font-size:.9em;
        p{
            opacity:.8;
            margin: 0 .3em;
        }
        a{
            font-weight:bold;
            opacity:1;
        }
    }
`