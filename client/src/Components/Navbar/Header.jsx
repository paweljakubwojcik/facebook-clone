import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { RoundButton } from '../General/Buttons'
import Search from './Search'
import { ReactComponent as Logo } from '../../styles/svg/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { MAX_TABLET_PX } from '../../styles/breakpoints'

export default function Header({ isCovered, ...rest }) {
    const [searchActive, setSearchActive] = useState(false)

    return (
        <StyledHeader {...rest} isCovered={isCovered ? 1 : 0} searchActive={searchActive ? 1 : 0}>
            <TransitionGroup component={null}>
                <CSSTransition key={searchActive} timeout={200}>
                    {!searchActive ? (
                        <Link to="/">
                            <Logo className="img" />
                            {/*  <MediaQuery width={400}>{!isCovered && <h1>Fakebook</h1>}</MediaQuery> */}
                        </Link>
                    ) : (
                        <RoundButton
                            style={{ flexShrink: 0, fontSize: '.8em' }}
                            size={32}
                            onClick={() => setSearchActive(false)}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </RoundButton>
                    )}
                </CSSTransition>
            </TransitionGroup>

            <Search
                active={searchActive}
                setActive={setSearchActive}
                isCovered={isCovered ? 1 : 0}
            />
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    position: ${(props) => (props.isCovered ? 'fixed' : 'relative')};
    z-index: 3;
    margin: 0.3em 0.3em 0.3em 0;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isCovered ? '' : 'end')};
    width: 18em;
    transition: width 0.4s;
    a {
        display: flex;
        align-items: center;
    }
    h1 {
        margin: 0 1em;
    }
    .img {
        height: 40px;
        color: ${(props) => props.theme.primaryColor};
        ${(props) => (props.isCovered ? ' z-index:3; transform:translateX(100%);' : '')}
        transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @media (max-width: ${MAX_TABLET_PX}) {
        .img {
            position: static;
        }

        width: ${(props) => (props.searchActive ? 'calc(100% - 1em)' : '15em')};
        z-index: 2;
        position: absolute;
    }

    .enter {
        opacity: 0;
        transform: translateX(-50%);
        position: absolute;
        left: 0;
    }
    .enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 200ms, transform 200ms;
    }
    .exit {
        transform: translateX(0);
        opacity: 1;
    }
    .exit-active {
        opacity: 0;
        position: absolute;
        left: 0;
        transform: translateX(-50%);
        transition: opacity 50ms, transform 200ms;
    }
`
