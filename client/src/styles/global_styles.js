import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
    }

    *:focus {
        outline: 2px solid ${(props) => props.theme.primaryColor};
    }

    html {
        ${(props) => props.theme.scrollBar}
        overflow-x:hidden;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.primaryFontColor};
        font-size: 16px;
        transition: font-size 0.2s, color 0.2s, background-color 0.3s;
    }

    code {
     font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    h1,
    h2,
    h3,
    h4,
    p {
        margin: 0;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
        display: inline-block;
        margin: 0;
    }

    button {
        border: none;
        outline: none;
    }

    button:active {
        outline: none;
        border: none;
    }

    input {
        border: none;
        outline: none;
    }

    @media (max-width: 700px) {
        body {
            font-size: 12px;
        }
    }


`
