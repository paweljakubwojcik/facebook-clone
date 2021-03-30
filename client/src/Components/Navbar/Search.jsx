import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../General/StyledInput'
import ElementContainer from '../General/ElementContainer'
import UserButton from '../General/UserButton'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { SEARCH } from '../../Util/GraphQL_Queries'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search({ setActive, active, isCovered, ...rest }) {
    const [search, setSearch] = useState('')

    const { data: { searchForUser: users } = {} } = useQuery(SEARCH, {
        variables: {
            query: search,
        },
        fetchPolicy: 'cache-and-network',
    })

    if (isCovered) return null
    return (
        <>
            <Container active={active ? 1 : 0}>
                <Icon icon={faSearch} active={active ? 1 : 0} />
                <SearchInput
                    {...rest}
                    placeholder="search fakebook..."
                    onFocus={() => setActive(true)}
                    active={active ? 1 : 0}
                    onInput={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </Container>
            {active && (
                <SearchResults>
                    {users?.length
                        ? users.map((user) => (
                              <UserButton
                                  key={user.id}
                                  user={user}
                                  notLink
                                  as={Link}
                                  to={`/profile/${user.id}`}
                                  onClick={() => setActive(false)}
                              />
                          ))
                        : 'no matching results'}
                </SearchResults>
            )}
        </>
    )
}

const SearchInput = styled(Input)`
    padding: 1.2em;
    padding-left: ${(props) => (props.active ? '1.2em' : '2.5em')};
    width: 100%;

    transition: padding-left 0.2s;
`

const Container = styled.div`
    position: relative;
    font-size: 1rem;

    display: flex;
    transition: width 0.2s;
    width: ${(props) => (props.active ? 'calc(100% - 36px)' : 'calc(100% - 52px)')};

    color: ${(props) => props.theme.secondaryFontColor};
`

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 1em;
    transform: translate(0, -50%);

    opacity: ${(props) => (props.active ? '0' : '1')};
    transition: opacity 0.2s;

    color: inherit;
`

const SearchResults = styled(ElementContainer)`
    margin: 0;
    padding-top: 4em;
    position: absolute;
    z-index: -1;
    top: -1em;
    left: -1em;

    width: calc(100% + 2em);
`
