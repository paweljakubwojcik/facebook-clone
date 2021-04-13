import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { infoIcons } from '../InfoIcons'

import { FilledButton } from '../../../Components/General/Buttons'

import { UserMatchContext } from '../userMatchContext'
import { shuffleArray } from '../../../Util/Methods'

export default function InfoBrief({ info }) {
    const isViewerTheOwner = useContext(UserMatchContext)
    const history = useHistory()

    const [briefInfo, setBriefInfo] = useState(null)

    const getBriefInfo = (wholeInfo) => {
        const info = Object.entries(wholeInfo)
        info.splice(0, 1)
        //filter infos that are null
        const infoThatIsNotNull = info.filter(([key, info]) => info)
        // return 7 first elements from shufled array
        return shuffleArray(infoThatIsNotNull).splice(0, 7)
    }

    useEffect(() => {
        setBriefInfo(getBriefInfo(info))
    }, [info])

    const Information = ({ info }) => {
        const sliced = info[0].replace(/([A-Z])/g, ' $1')
        const key = sliced.charAt(0).toUpperCase() + sliced.slice(1)
        const value = info[1]
            ? info[1].charAt(0).toUpperCase() + info[1].slice(1).toLowerCase()
            : null
        return (
            <InfoElement>
                <FontAwesomeIcon
                    icon={infoIcons[info[0]]}
                    listItem
                    style={{ position: 'static' }}
                />
                {key} : {value}
            </InfoElement>
        )
    }

    return (
        <Container>
            {briefInfo &&
                briefInfo.map((information) => (
                    <Information key={information[0]} info={information} />
                ))}
            {isViewerTheOwner && (
                <FilledButton onClick={() => history.push({ hash: 'info' })}>
                    Update fake info
                </FilledButton>
            )}
        </Container>
    )
}

const InfoElement = styled.li``

const Container = styled.ul`
    list-style: none;
    padding: 0;
    margin: none;
`
