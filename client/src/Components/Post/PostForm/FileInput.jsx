import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled from 'styled-components/macro'

export default forwardRef((props, ref) => {
    const [fileInputVisibility, setFileInputVis] = useState(false)
    const [fileInputHover, setFileInputHover] = useState(false)

    const handleBodyDrag = (e) => {
        if (e.type === 'dragenter') setFileInputVis(true)
        if (e.type === 'dragleave' && !e.relatedTarget) setFileInputVis(false)
    }

    useEffect(() => {
        document.body.addEventListener('dragleave', handleBodyDrag)
        document.body.addEventListener('dragenter', handleBodyDrag)

        return () => {
            document.body.removeEventListener('dragenter', handleBodyDrag)
            document.body.removeEventListener('dragleave', handleBodyDrag)
        }
    }, [])

    return (
        <>
            <StyledInput
                ref={ref}
                visibility={fileInputVisibility ? 1 : 0}
                name="images"
                id="file"
                type="file"
                multiple
                accept="image/*"
                onChange={() => {
                    setFileInputVis(false)
                    setFileInputHover(false)
                }}
                onDragEnter={() => {
                    setFileInputHover(true)
                }}
                onDragLeave={() => {
                    setFileInputHover(false)
                }}
            />
            <Label visibility={fileInputVisibility ? 1 : 0} hover={fileInputHover ? 1 : 0} htmlFor="images">
                {' '}
                Drop images here
            </Label>
        </>
    )
})

const StyledInput = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    z-index: ${(props) => (props.visibility ? '1' : '-1')};
`

const Label = styled.label`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: ${(props) => (props.visibility ? '.9' : '0')};
    background-color: ${(props) => props.theme.primaryColor};
    font-weight: bold;
    border-radius: 0.5em;
    pointer-events: none;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s, background-color 0.3s;
    color: ${(props) => (props.hover ? props.theme.primaryColor : '')};
    background-color: ${(props) => (props.hover ? props.theme.primaryFontColor : '')};
`
