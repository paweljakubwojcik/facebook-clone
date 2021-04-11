import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { infoIcons } from '../InfoIcons'

import ElementContainer from '../../../Components/General/ElementContainer'
import { GenericButton } from '../../../Components/General/Buttons'

import { normalizeString } from '../../../Util/Methods'
import useResizableInput from '../../../Util/Hooks/useResizableInput'

import { useForm } from '../../../Util/Hooks/useForm'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_INFO } from '../../../Util/GraphQL_Queries'
import DotLoader from '../../../Components/General/DotLoader'
import ErrorMessage from '../../../Components/General/ErrorMessage'
import { UserMatchContext } from '../userMatchContext'

export default function Info({ info }) {
    return (
        <ElementContainer>
            {Object.entries(info)
                .filter(([key]) => key !== '__typename')
                .map((info) => (
                    <InfoElement info={info} key={info[0]} />
                ))}
        </ElementContainer>
    )
}

const InfoElement = ({ info }) => {
    const [editMode, setEditMode] = useState(false)
    const userMatch = useContext(UserMatchContext)
    const [key, value] = info
    const resizableInput = useResizableInput()

    const [updateInfo, { loading, error }] = useMutation(UPDATE_USER_INFO)

    const { onChange, onSubmit, values } = useForm(update, { [key]: value || '' })

    function update() {
        updateInfo({
            variables: {
                field: Object.keys(values)[0],
                newValue: Object.values(values)[0],
            },
            update: () => {
                setEditMode(false)
            },
        })
    }

    if (!userMatch && !value) return null

    return (
        <div
            style={{
                fontSize: '1.2em',
                margin: '0.4em',
            }}
        >
            <Title>
                <FontAwesomeIcon icon={infoIcons[key]} listItem style={{ position: 'static' }} />
                {value || editMode ? (
                    <>
                        <div>{normalizeString(key)}</div>
                    </>
                ) : (
                    <BlueButton onClick={() => setEditMode(true)}>
                        Add {normalizeString(key)}
                    </BlueButton>
                )}
            </Title>
            <Value>
                {editMode ? (
                    <Form onSubmit={onSubmit} onChange={onChange}>
                        <Input
                            name={key}
                            type={key.includes('Date') ? 'date' : 'text'}
                            as={key.includes('Date') ? 'input' : 'textarea'}
                            defaultValue={values[key] || ''}
                            autoFocus={true}
                            ref={resizableInput}
                            rows={1}
                        />
                        {loading && <DotLoader style={{ fontSize: '.3em' }} />}

                        {!loading && <ButtonWithoutMargin role="submit">Save</ButtonWithoutMargin>}

                        <ButtonWithoutMargin role="button" onClick={() => setEditMode(false)}>
                            Cancel
                        </ButtonWithoutMargin>

                        {error && <ErrorMessage textOnly>{error.message}</ErrorMessage>}
                    </Form>
                ) : (
                    <Flex>
                        <div style={{ maxWidth: '12em', wordWrap: 'break-word' }}>{value}</div>
                        {userMatch && value && (
                            <ButtonWithoutMargin onClick={() => setEditMode(true)}>
                                edit
                            </ButtonWithoutMargin>
                        )}
                    </Flex>
                )}
            </Value>
        </div>
    )
}

const Title = styled.div`
    display: flex;
    align-items: center;
`

const Value = styled.div`
    color: ${(props) => props.theme.secondaryFontColor};
    padding: 0.3em 5em;
`

const ButtonWithoutMargin = styled(GenericButton)`
    margin: 0 1em;
    padding: 0;
    font-size: 0.7em;
`

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
`

const Input = styled.textarea`
    background: transparent;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    margin: 0;
    padding: 0;
    cursor: initial;
    max-width: 12em;
    width: fit-content;
    resize: none;
    border: none;
`
const Form = styled.form`
    display: flex;
    align-items: center;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`
