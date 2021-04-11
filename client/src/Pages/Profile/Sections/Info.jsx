import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { infoIcons } from '../InfoIcons'

import ElementContainer from '../../../Components/General/ElementContainer'
import { GenericButton } from '../../../Components/General/Buttons'
import StyledInput from '../../../Components/General/StyledInput'

import { normalizeString } from '../../../Util/Methods'

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

    if(!userMatch && !value) return null

    return (
        <div
            style={{
                fontSize: '1.2em',
            }}
        >
            <Title>
                <FontAwesomeIcon icon={infoIcons[key]} listItem style={{ position: 'static' }} />
                {value || editMode ? (
                    <>
                        <div>{normalizeString(key)}</div>
                        {!editMode && userMatch && (
                            <GenericButton
                                style={{ fontSize: '.7em', margin: 0 }}
                                onClick={() => setEditMode(true)}
                            >
                                edit
                            </GenericButton>
                        )}
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
                        {key.includes('Date') ? (
                            <Input name={key} type={'date'} defaultValue={values[key] || ''} />
                        ) : (
                            <Input name={key} type={'text'} defaultValue={values[key] || ''} />
                        )}
                        <div style={{ display: 'flex' }}>
                            {loading ? (
                                <DotLoader style={{ fontSize: '.3em' }} />
                            ) : (
                                <GenericButton role="submit">Save</GenericButton>
                            )}
                            <GenericButton role="button" onClick={() => setEditMode(false)}>
                                Cancel
                            </GenericButton>
                        </div>
                        {error && <ErrorMessage textOnly>{error.message}</ErrorMessage>}
                    </Form>
                ) : (
                    normalizeString(value)
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

const BlueButton = styled(GenericButton)`
    color: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
`

const Input = styled(StyledInput)`
    font-size: inherit;
    margin: 0;
    cursor: initial;
`
const Form = styled.form``
